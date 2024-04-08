// video.tsx

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Heading } from './heading';
import { VideoIcon } from 'lucide-react';

// Define the expected structure of the frame data
interface FrameData {
    data: string; // assuming data is a base64 string
}

const VideoFeed = () => {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        // Connect to the WebSocket server only once when the component is mounted
        const newSocket = io('http://127.0.0.1:5000', {
    reconnection: true, // Default is true, but explicitly setting as an example
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
});

        console.log('Attempting to connect to server...');
        setSocket(newSocket);

        // Define the cleanup logic for when the component is unmounted
        return () => {
            console.log('Disconnecting...');
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            // Log the connection event
            socket.on('connect', () => {
                console.log('Connected to the WebSocket server.');
            });

            // Log the disconnection event
            socket.on('disconnect', () => {
                console.log('Disconnected from the WebSocket server.');
            });

            // Listen for 'frame' events from the Flask server
            socket.on('frame', (data: FrameData) => {
                // Get the image element by its ID
                const imageElement = document.getElementById('live-frame') as HTMLImageElement;
                if (imageElement) {
                    imageElement.src = data.data;
                    console.log('Frame data received:', data.data.substring(0, 50)); // Log first 50 chars
                }
            });

            // Remove the event listeners when the component unmounts
            return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('frame');
            };
        }
    }, [socket]);

    return (
        <div>
            
      <Heading
        title="Let's Work out Together"
        description="Hi, I'm Kai. And I'm going to supervised you if you are doing well on your exercise.  ❤️"
        icon={VideoIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"></Heading>
            <div className="d-flex align-items-center">
            <center>
            <img src="./logo.png" alt="Kai" ></img>
            </center>
            </div>
            <img id="live-frame" alt="Live Feed" style={{ maxWidth: '100%' }} />
            
           
        </div>
    );
};

const VideoPage = () => {
    return (
        <div>
            <VideoFeed />
        </div>
    );
};

export default VideoPage;
