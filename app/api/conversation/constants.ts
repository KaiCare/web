export const embeddingSchema = {
  description: "Brx to get embedding from input.",
  brxName: "Embedding",
  brxId: "79e6dcb1-15b4-470c-8b85-4243ad5cd620",
  dependantBrxIds: {},
  processType: 19,
  schemas: {
    mainBrxId: "79e6dcb1-15b4-470c-8b85-4243ad5cd620",
    schemas: {
      _isMap: true,
      data: [
        [
          "main_brx_entry_schema",
          {
            schemaFields: {
              _isMap: true,
              data: [
                [
                  "input1",
                  { fieldValueDataType: "string", fieldValue: "testval" },
                ],
              ],
            },
            brxName: "Embedding",
            brxId: "79e6dcb1-15b4-470c-8b85-4243ad5cd620",
          },
        ],
      ],
    },
  },
};

export const responseSchema = {
  description: "Kay composing the output",
  brxName: "Kay",
  brxId: "57580e95-502a-4adf-923f-1a2535ef4c61",
  dependantBrxIds: {},
  processType: 7,
  schemas: {
    mainBrxId: "57580e95-502a-4adf-923f-1a2535ef4c61",
    schemas: {
      _isMap: true,
      data: [
        [
          "main_brx_entry_schema",
          {
            schemaFields: {
              _isMap: true,
              data: [
                [
                  "query",
                  { fieldValueDataType: "string", fieldValue: "testval" },
                ],
                [
                  "knowledge",
                  { fieldValueDataType: "string", fieldValue: "testval" },
                ],
              ],
            },
            brxName: "Kay",
            brxId: "57580e95-502a-4adf-923f-1a2535ef4c61",
          },
        ],
      ],
    },
  },
};
