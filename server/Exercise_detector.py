# !pip install tensorflow==2.4.1 tensorflow-gpu==2.4.1 opencv-python mediapipe scikit-learn matplotlib

import cv2                                  # Import OpenCV
import numpy as np                          # Import NumPy to help structure arrays (datasets)
import os                                   # To easier work with filepaths
from matplotlib import pyplot as plt        # Import pyplot from Matplotlib
import time                                 # Import time
import mediapipe as mp                      # Import MediaPipe

from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from flask_cors import CORS

# ... after creating your Flask app


from scipy import stats

from flask import Flask
from flask_socketio import SocketIO
import base64
import threading
import os

from sklearn.metrics import multilabel_confusion_matrix, accuracy_score

# Function to make the detection
def mediapipe_detection(image, model):
    # Convert colors from BGR to RGB (needs to be RGB to make detection in MediaPipe)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
    # To save space --> make unwriteable image
    image.flags.writeable = False  
    # Make prediction
    results = model.process(image) 
    # Convert back to writeable image
    image.flags.writeable = True  
    # Convert colors from BGR to RGB                 
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) 
    return image, results

def draw_landmarks(image, results):
    # Holistic model to make detection
    mp_holistic = mp.solutions.holistic 

    # Drawing utilities to draw detection
    mp_drawing = mp.solutions.drawing_utils 
    # Draw face connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION, 
                             mp_drawing.DrawingSpec(color=(236,138,26), thickness=1, circle_radius=1),  # dot color (remember colors are in BGR )  
                             mp_drawing.DrawingSpec(color=(236,208,26), thickness=1, circle_radius=1)   # line color
                             ) 
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                             mp_drawing.DrawingSpec(color=(186,52,25), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(236,103,26), thickness=2, circle_radius=2)
                             ) 
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(0,153,0), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(51,255,51), thickness=2, circle_radius=2)
                             ) 
    # Draw right hand connections  
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(255,255,0), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(255,255,102), thickness=2, circle_radius=2)
                             ) 

def keypoints_extraction(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(132)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(1404)                # multiplied by 3 as it has x, y and z components
    left_hand = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(63)  
    right_hand = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(63)
    return np.concatenate([pose])   # for demo just pose


def LSTM_model(X_train, X_test, y_train, y_test):

    log_dir = os.path.join('Logs')
    tb_callback = TensorBoard(log_dir=log_dir)
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30,132)))
    model.add(LSTM(128, return_sequences=True, activation='relu'))
    model.add(LSTM(64, return_sequences=False, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(exercises.shape[0], activation='softmax'))
    
    model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])
    model.fit(X_train, y_train, epochs=50, callbacks=[tb_callback])
    return model

def prob_viz(res, exercises, input_frame, colors):
    output_frame = input_frame.copy()
    #for num, prob in enumerate(res):
        #cv2.rectangle(output_frame, (0,60+num*40), (int(prob*100), 90+num*40), colors[num], -1)
        #cv2.putText(output_frame, exercises[num], (0, 85+num*40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
        
    return output_frame

def live_test(cap, colors, exercises, model):
    # LIVE TEST

    # 1. New detection variables
    sequence = []
    sentence = []
    predictions = []
    threshold = 0.9

    cap = cv2.VideoCapture(0)
    # Set mediapipe model 
    mp_holistic = mp.solutions.holistic 
    with mp_holistic.Holistic(min_detection_confidence=0.8, min_tracking_confidence=0.8) as holistic:
        while cap.isOpened():

            # Read feed
            ret, frame = cap.read()
            if not ret:
                break

            # Make detections
            image, results = mediapipe_detection(frame, holistic)
            print(results)

            # Draw landmarks
            draw_landmarks(image, results)

            # 2. Prediction logic
            keypoints = keypoints_extraction(results)
            sequence.append(keypoints)
            sequence = sequence[-30:]

            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]
                print(exercises[np.argmax(res)])
                predictions.append(np.argmax(res))


            #3. Viz logic
                if np.unique(predictions[-10:])[0]==np.argmax(res): 
                    if res[np.argmax(res)] > threshold: 

                        if exercises[np.argmax(res)] == 'Standing heel raises':
                            sentence = 'Good job!'
                            cv2.putText(image, ' '.join(sentence), (10,30), 
                                cv2.FONT_HERSHEY_DUPLEX, 1, (51, 255, 51), 2, cv2.LINE_AA)
                            
                        else:
                            sentence = 'You nearly have it, keep going!'
                            cv2.putText(image, ' '.join(sentence), (10,30), 
                                cv2.FONT_HERSHEY_DUPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
                        #if len(sentence) > 0: 
                        #    if exercises[np.argmax(res)] != sentence[-1]:
                        #        sentence = exercises[np.argmax(res)]
                        #else:
                        #    sentence = exercises[np.argmax(res)]

                #if len(sentence) > 5: 
                #    sentence = sentence[-5:]

                # Viz probabilities
                image = prob_viz(res, exercises, image, colors)

            #cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
            #cv2.putText(image, ' '.join(sentence), (0,30), 
            #               cv2.FONT_HERSHEY_DUPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            _, buffer = cv2.imencode('.jpg', image)
            encoded_frame = base64.b64encode(buffer).decode('utf-8')
            socketio.emit('frame', {'data': f'data:image/jpeg;base64,{encoded_frame}'})

            time.sleep(0.1)  # Simple way to control the frame rate

            print('Emitting frame')

        cap.release()
        cv2.destroyAllWindows()
    return 
# Initialize Flask and SocketIO

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}) # This allows all domains. For security, specify your client's domain in production.

socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/video')
def index():
    return "The Exercise Detector server is running!"

# Define what to do on WebSocket connection
@socketio.on('connect')
def on_connect(model):
    model_path = os.path.join(os.getcwd(), 'exercise.h5')
    model = Sequential([
        LSTM(64, return_sequences=True, activation='relu', input_shape=(30,132)),
        LSTM(128, return_sequences=True, activation='relu'),
        LSTM(64, return_sequences=False, activation='relu'),
        Dense(64, activation='relu'),
        Dense(32, activation='relu'),
        # This needs to be adjusted based on the number of classes you have.
        Dense(3, activation='softmax')
    ])
    model.load_weights(model_path)
    print('Client connected')
    # Start the camera and live test on a separate thread
    cap = cv2.VideoCapture(0)
    thread = threading.Thread(target=live_test, args=(cap, [], ['Standing heel raises', 'Shoulder exercise', 'Left torso'], model))
    thread.start()


# Initizalize Holistic model to make detection
mp_holistic = mp.solutions.holistic 

# Path for exported data, these are numpy arrays
DATA_PATH = os.path.join('./MP_Data') 
# exercises that we try to detect
exercises = np.array(['Standing heel raises','Shoulder exercise','Left torso'])
# Number of videos collected per exercise
no_sequences = 30
# 30 frames each video
sequence_length = 30
# Folder start
start_folder = 30

# Create folders where data is stored
for exercise in exercises:      # loop through exercises
    for sequence in range(no_sequences):     # loop through videos
        try:    # just in case the directories are created already to avoid errors
            os.makedirs(os.path.join(DATA_PATH, exercise, str(sequence)))  # a folder is created called 'MP_Data', then inside it another folder for each exercise, and within in exercise there will be a folder for each sequence/video
        except: # if the folder is created, skip making the directory
            pass

# DATA COLLECTION

datac_y_n = 0   #set value

if datac_y_n  == 1:  # 1 to capture
    # Set camera
    cap = cv2.VideoCapture(0)
    # Set mediapipe model 
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:

        # Loop through exercises
        for exercise in exercises:
            # Loop through sequences/videos
            cv2.waitKey(1000)    # wait a second
            for sequence in range(no_sequences):
                # Loop through video length
                for frame_num in range(sequence_length):
                    # Read feed
                    ret, frame = cap.read()
                    # Make detections
                    image, results = mediapipe_detection(frame, holistic)
                    # Draw landmarks
                    draw_landmarks(image, results)
                    # Apply wait logic
                    if frame_num == 0: 
                        cv2.putText(image, 'STARTING COLLECTION', (120,200), # x and y values of pixels where it is going to be displayed
                                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255, 0), 4, cv2.LINE_AA) # font, font size, color in BGR, line width and line type
                        cv2.putText(image, 'Collecting frames for {} Video Number {}'.format(exercise, sequence), (15,12), 
                                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1, cv2.LINE_AA)
                        # Show to screen
                        cv2.imshow('OpenCV Feed', image)
                        cv2.waitKey(1000)    # wait half a second
                    else: # if not in frame 0
                        cv2.putText(image, 'Collecting frames for {} Video Number {}'.format(exercise, sequence), (15,12), 
                                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1, cv2.LINE_AA)
                        # Show to screen
                        cv2.imshow('OpenCV Feed', image)
                    # Extract and export keypoints
                    keypoints = keypoints_extraction(results)
                    npy_path = os.path.join(DATA_PATH, exercise, str(sequence), str(frame_num))
                    np.save(npy_path, keypoints)
                    # Breakq
                    if  0xFF == ord('q'):
                        break
        cap.release()
        cv2.destroyAllWindows()


# DATA PREPROCESSING

datap_y_n = 1   #set value 
if datap_y_n  == 1:  # 1 to capture

    label_map = {label:num for num, label in enumerate(exercises)}
    sequences, labels = [], []
    for exercise in exercises:
        for sequence in range(no_sequences):
            window = []
            for frame_num in range(sequence_length):
                res = np.load(os.path.join(DATA_PATH, exercise, str(sequence), "{}.npy".format(frame_num)))
                window.append(res)
            sequences.append(window)
            labels.append(label_map[exercise])
    X = np.array(sequences)
    y = to_categorical(labels).astype(int)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.05, random_state = 42)

# TRAINING THE MODEL

datat_y_n = 0   #set value 
if datat_y_n  == 1:  # 1 to capture

    # model
    model = LSTM_model(X_train, X_test, y_train, y_test)
    prediction = model.predict(X_test)
    exercises[np.argmax(prediction[0])]
    exercises[np.argmax(y_test[0])]
    model.save('exercise.h5')
    del model

# LIVE TEST

# Start the Flask server
if __name__ == '__main__':
    socketio.run(app, debug=True)

datalt_y_n = 1   #set value 
if datalt_y_n  == 1:  # 1 to capture

    model_path = os.path.join(os.getcwd(), 'exercise.h5')
    model = Sequential([
        LSTM(64, return_sequences=True, activation='relu', input_shape=(30,132)),
        LSTM(128, return_sequences=True, activation='relu'),
        LSTM(64, return_sequences=False, activation='relu'),
        Dense(64, activation='relu'),
        Dense(32, activation='relu'),
        # This needs to be adjusted based on the number of classes you have.
        Dense(3, activation='softmax')
    ])
    model.load_weights(model_path)
    yhat = model.predict(X_test)
    ytrue = np.argmax(y_test, axis=1).tolist()
    yhat = np.argmax(yhat, axis=1).tolist()
    multilabel_confusion_matrix(ytrue, yhat)
    accuracy_score(ytrue, yhat)
    colors = [(245,117,16), (117,245,16), (16,117,245)]
    cap = cv2.VideoCapture(0)
    live_test(cap,colors, exercises,model)