// Transcribed from the supplied manuscript: Table 1 (p. 7), Table 2 (p. 9), Table 3 (p. 26).
// Accuracy is in percent; tokens are average per sample in thousands.
window.ACTS_RESULTS = {
  "benchmarks": [
    "LiveCodeBench",
    "HumanEval",
    "HLE",
    "HotpotQA",
    "MMLU-Pro",
    "AIME 2025",
    "AIME 2026",
    "Beyond-AIME",
    "HMMT 2025"
  ],
  "models": [
    {
      "id": "gpt",
      "name": "GPT-OSS-120B",
      "methods": [
        {
          "name": "Direct Prompting",
          "group": "single",
          "accuracy": [
            88.57,
            89.63,
            42.4,
            20.0,
            70.0,
            60.0,
            86.67,
            16.0,
            46.67
          ],
          "average": 57.77,
          "tokens": {
            "hotpot": 5.8,
            "hle": 4.5
          }
        },
        {
          "name": "LLM-Debate",
          "group": "static",
          "accuracy": [
            92.0,
            88.41,
            42.8,
            21.35,
            71.43,
            63.33,
            86.67,
            18.0,
            46.67
          ],
          "average": 58.96,
          "tokens": {
            "hotpot": 14.1,
            "hle": 12.3
          }
        },
        {
          "name": "AutoGen",
          "group": "static",
          "accuracy": [
            95.43,
            90.24,
            41.2,
            32.03,
            77.14,
            70.0,
            80.0,
            18.0,
            46.67
          ],
          "average": 61.19,
          "tokens": {
            "hotpot": 16.0,
            "hle": 13.8
          }
        },
        {
          "name": "LangGraph",
          "group": "static",
          "accuracy": [
            93.14,
            89.02,
            42.4,
            40.0,
            84.29,
            76.67,
            86.67,
            23.0,
            50.0
          ],
          "average": 65.02,
          "tokens": {
            "hotpot": 16.4,
            "hle": 14.0
          }
        },
        {
          "name": "Agent Framework",
          "group": "static",
          "accuracy": [
            93.14,
            90.24,
            42.0,
            32.03,
            84.29,
            73.33,
            76.67,
            36.0,
            40.0
          ],
          "average": 63.08,
          "tokens": {
            "hotpot": 16.7,
            "hle": 14.2
          }
        },
        {
          "name": "G-Designer",
          "group": "centralized",
          "accuracy": [
            94.29,
            93.29,
            42.8,
            34.73,
            70.0,
            73.33,
            83.33,
            28.0,
            43.33
          ],
          "average": 62.57,
          "tokens": {
            "hotpot": 12.5,
            "hle": 10.8
          }
        },
        {
          "name": "TopoDIM",
          "group": "centralized",
          "accuracy": [
            93.71,
            92.68,
            42.0,
            30.68,
            65.71,
            66.67,
            83.33,
            25.0,
            33.33
          ],
          "average": 59.23,
          "tokens": {
            "hotpot": 11.4,
            "hle": 9.8
          }
        },
        {
          "name": "GTD",
          "group": "centralized",
          "accuracy": [
            94.86,
            93.9,
            42.4,
            35.95,
            71.43,
            70.0,
            80.0,
            30.0,
            46.67
          ],
          "average": 62.8,
          "tokens": {
            "hotpot": 12.1,
            "hle": 10.5
          }
        },
        {
          "name": "MaAS",
          "group": "centralized",
          "accuracy": [
            94.86,
            93.29,
            41.6,
            33.38,
            68.57,
            66.67,
            86.67,
            27.0,
            40.0
          ],
          "average": 61.34,
          "tokens": {
            "hotpot": 11.8,
            "hle": 10.2
          }
        },
        {
          "name": "Agent Q-Mix",
          "group": "learned",
          "accuracy": [
            95.43,
            100.0,
            38.4,
            40.0,
            100.0,
            80.0,
            90.0,
            36.0,
            66.67
          ],
          "average": 71.83,
          "tokens": {
            "hotpot": 8.7,
            "hle": 7.9
          }
        },
        {
          "name": "ACTS",
          "group": "ours",
          "accuracy": [
            96.57,
            100.0,
            43.2,
            46.67,
            100.0,
            83.33,
            93.33,
            42.0,
            70.0
          ],
          "average": 75.01,
          "tokens": {
            "hotpot": 7.1,
            "hle": 6.4
          }
        }
      ],
      "ablations": [
        {
          "label": "ACTS",
          "accuracy": 75.01,
          "tokens": 5.97
        },
        {
          "label": "Topological mixer replaced by QMIX",
          "accuracy": 71.83,
          "tokens": 7.41
        },
        {
          "label": "Learned routing replaced by fixed role-based partners",
          "accuracy": 72.5,
          "tokens": 8.1
        },
        {
          "label": "Role embeddings removed from relational attention",
          "accuracy": 73.4,
          "tokens": 6.8
        }
      ]
    },
    {
      "id": "deepseek",
      "name": "DeepSeek-V4-Flash",
      "methods": [
        {
          "name": "Direct Prompting",
          "group": "single",
          "accuracy": [
            93.14,
            98.17,
            33.6,
            40.0,
            72.86,
            50.0,
            66.67,
            10.0,
            46.67
          ],
          "average": 56.79,
          "tokens": {
            "hotpot": 3.6,
            "hle": 2.8
          }
        },
        {
          "name": "LLM-Debate",
          "group": "static",
          "accuracy": [
            93.14,
            96.95,
            34.0,
            40.0,
            61.43,
            53.33,
            66.67,
            12.0,
            36.67
          ],
          "average": 54.91,
          "tokens": {
            "hotpot": 9.5,
            "hle": 8.2
          }
        },
        {
          "name": "AutoGen",
          "group": "static",
          "accuracy": [
            96.0,
            98.17,
            32.8,
            42.7,
            71.43,
            60.0,
            70.0,
            15.0,
            46.67
          ],
          "average": 59.2,
          "tokens": {
            "hotpot": 10.8,
            "hle": 9.3
          }
        },
        {
          "name": "LangGraph",
          "group": "static",
          "accuracy": [
            92.57,
            97.56,
            33.6,
            46.62,
            78.57,
            60.0,
            70.0,
            26.0,
            46.67
          ],
          "average": 61.29,
          "tokens": {
            "hotpot": 11.0,
            "hle": 9.5
          }
        },
        {
          "name": "Agent Framework",
          "group": "static",
          "accuracy": [
            89.71,
            98.17,
            33.2,
            44.05,
            75.71,
            66.67,
            76.67,
            20.0,
            43.33
          ],
          "average": 60.83,
          "tokens": {
            "hotpot": 11.3,
            "hle": 9.7
          }
        },
        {
          "name": "G-Designer",
          "group": "centralized",
          "accuracy": [
            93.71,
            97.56,
            33.6,
            46.62,
            88.57,
            63.33,
            73.33,
            22.0,
            43.33
          ],
          "average": 62.45,
          "tokens": {
            "hotpot": 8.4,
            "hle": 7.2
          }
        },
        {
          "name": "TopoDIM",
          "group": "centralized",
          "accuracy": [
            92.57,
            97.56,
            32.8,
            44.05,
            88.57,
            60.0,
            70.0,
            18.0,
            46.67
          ],
          "average": 61.14,
          "tokens": {
            "hotpot": 7.6,
            "hle": 6.6
          }
        },
        {
          "name": "GTD",
          "group": "centralized",
          "accuracy": [
            93.71,
            97.56,
            34.0,
            47.97,
            90.0,
            63.33,
            73.33,
            24.0,
            43.33
          ],
          "average": 63.03,
          "tokens": {
            "hotpot": 8.1,
            "hle": 7.0
          }
        },
        {
          "name": "MaAS",
          "group": "centralized",
          "accuracy": [
            94.29,
            98.17,
            32.8,
            46.62,
            88.57,
            63.33,
            73.33,
            20.0,
            43.33
          ],
          "average": 62.27,
          "tokens": {
            "hotpot": 7.9,
            "hle": 6.8
          }
        },
        {
          "name": "Agent Q-Mix",
          "group": "learned",
          "accuracy": [
            93.14,
            100.0,
            32.8,
            44.0,
            92.86,
            60.0,
            73.33,
            33.0,
            40.0
          ],
          "average": 63.24,
          "tokens": {
            "hotpot": 5.8,
            "hle": 5.3
          }
        },
        {
          "name": "ACTS",
          "group": "ours",
          "accuracy": [
            96.0,
            100.0,
            34.4,
            50.67,
            97.14,
            70.0,
            86.67,
            40.0,
            50.0
          ],
          "average": 69.43,
          "tokens": {
            "hotpot": 4.8,
            "hle": 4.3
          }
        }
      ],
      "ablations": [
        {
          "label": "ACTS",
          "accuracy": 69.43,
          "tokens": 4.03
        },
        {
          "label": "Topological mixer replaced by QMIX",
          "accuracy": 63.24,
          "tokens": 4.96
        },
        {
          "label": "Learned routing replaced by fixed role-based partners",
          "accuracy": 66.1,
          "tokens": 6.2
        },
        {
          "label": "Role embeddings removed from relational attention",
          "accuracy": 67.1,
          "tokens": 4.6
        }
      ]
    }
  ]
};
