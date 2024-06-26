
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/user/{id}": {
        "put": {
          "operationId": "UserController_update",
          "summary": "обновить профиль пользователя",
          "description": "Отправляем firstName, lastName, username*, tags[]",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/hashtag": {
        "get": {
          "operationId": "HashtagController_getTagsForSuggestion",
          "summary": "Получить все теги (топ 10)",
          "description": "по term",
          "parameters": [
            {
              "name": "searchTitleTerm",
              "required": false,
              "in": "query",
              "description": "Search tag by title",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "description": "Sorting direction",
              "schema": {
                "default": "desc",
                "type": "string"
              }
            },
            {
              "name": "sortField",
              "required": false,
              "in": "query",
              "description": "Sorting item",
              "schema": {
                "default": "score",
                "type": "string"
              }
            },
            {
              "name": "skip",
              "required": false,
              "in": "query",
              "description": "Number of items to skip",
              "schema": {
                "default": 0,
                "type": "number"
              }
            },
            {
              "name": "take",
              "required": false,
              "in": "query",
              "description": "Number of items to take",
              "schema": {
                "default": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ResponseHashtagDto"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Hashtag"
          ]
        }
      },
      "/auth/github": {
        "get": {
          "operationId": "AuthController_githubLogin",
          "summary": "Oauth2 github authorization",
          "parameters": [
            {
              "name": "code",
              "required": true,
              "in": "query",
              "description": "GitHub login code",
              "example": "",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseAccessTokenDto"
                  }
                }
              }
            },
            "401": {
              "description": ""
            },
            "403": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/mentor-setting/{id}": {
        "put": {
          "operationId": "MentorSettingController_update",
          "summary": "обновить менторские настройки",
          "description": "Какой тип помощи (интервью, кодревью и т.д.) и ссылка на видео-конеференцию (googlmeet, zoom и т. д.)",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateMentorSettingDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Mentor Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/issue": {
        "post": {
          "operationId": "IssueController_create",
          "summary": "Create a new issue",
          "description": "Пользователь может создать Запрос, который он хочет удовлетворить: {type, title, description, hashtags }",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateIssueDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IssueResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Issues"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/issue/{id}": {
        "put": {
          "operationId": "IssueController_update",
          "summary": "Update issue",
          "description": "Пользователь может обновить Запрос, которые он хочет удовлетворить: {type, title, description, hashtags }",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateIssueDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Issues"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/issue/{userId}": {
        "get": {
          "operationId": "IssueController_getForUser",
          "summary": "Вернуть все запросы для конкретного юзера (+по токену)",
          "description": "",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/IssueResponseDto"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Issues"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/session": {
        "post": {
          "operationId": "SessionController_create",
          "summary": "создать сессию",
          "description": "ментор нажимая кнопку Стартануть Сессию отправляет запрос сюда, сессия создаётся и ментор ждёт студента",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateSessionDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CreateSessionResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Sessions"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "SessionController_allSessions",
          "summary": "Все сессии всех пользователей",
          "description": "с фильтрацией: те которые in-progress, или все... с бесконечной поркруткой (курсор)",
          "parameters": [
            {
              "name": "searchStatus",
              "required": false,
              "in": "query",
              "description": "Search session by status",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "cursor",
              "required": false,
              "in": "query",
              "description": "Cursor id",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "description": "Sorting direction",
              "schema": {
                "default": "desc",
                "type": "string"
              }
            },
            {
              "name": "sortField",
              "required": false,
              "in": "query",
              "description": "Sorting item",
              "schema": {
                "default": "score",
                "type": "string"
              }
            },
            {
              "name": "skip",
              "required": false,
              "in": "query",
              "description": "Number of items to skip",
              "schema": {
                "default": 0,
                "type": "number"
              }
            },
            {
              "name": "take",
              "required": false,
              "in": "query",
              "description": "Number of items to take",
              "schema": {
                "default": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AllSessionResponseDto"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Sessions"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/session/{id}/{code}": {
        "get": {
          "operationId": "SessionController_connectToSession",
          "summary": "Редирект на зумгуглмит",
          "description": "студент переходит на промежуточный ендпоинт, котоырй переводит сессию в inprogress и редиректит в нужный видеочат",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "code",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ConnectSessionResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "If the inputModel has incorrect values",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BadRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Sessions"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/session/users/{userId}": {
        "get": {
          "operationId": "SessionController_allSessionsForUser",
          "summary": "Мои сессии",
          "description": "с фильтрацией: где я ментор и где я менти, с бесконечной поркруткой (курсор) (валидация по токену)",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "searchStatus",
              "required": false,
              "in": "query",
              "description": "Search session by status",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "cursor",
              "required": false,
              "in": "query",
              "description": "Cursor id",
              "schema": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "description": "Sorting direction",
              "schema": {
                "default": "desc",
                "type": "string"
              }
            },
            {
              "name": "sortField",
              "required": false,
              "in": "query",
              "description": "Sorting item",
              "schema": {
                "default": "score",
                "type": "string"
              }
            },
            {
              "name": "skip",
              "required": false,
              "in": "query",
              "description": "Number of items to skip",
              "schema": {
                "default": 0,
                "type": "number"
              }
            },
            {
              "name": "take",
              "required": false,
              "in": "query",
              "description": "Number of items to take",
              "schema": {
                "default": 10,
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AllSessionResponseDto"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Sessions"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/session/mentor/{id}": {
        "post": {
          "operationId": "SessionController_postFeedbackByMentor",
          "summary": "ментор оставляет фидбек о сессии",
          "description": "по сессия id, отправляя либо {status: Completed/Cancelled, messageForAdmin: string (* for Cancelled)}",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateFeedbackDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AllSessionResponseDto"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Sessions"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/session/mentee/{id}": {
        "post": {
          "operationId": "SessionController_postFeedbackByMentee",
          "summary": "ментор оставляет фидбек о сессии",
          "description": "по сессия id, отправляя либо {status: Completed/Cancelled, messageForAdmin?: string (* for Cancelled), completedTags: [] (* for Completed status))}",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateFeedbackDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/AllSessionResponseDto"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Not permitted"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Sessions"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Help2Debug backend",
      "description": "The Help2Debug API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Help2Debug",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "cookie": {
          "type": "apiKey",
          "in": "cookie",
          "name": "refreshToken"
        },
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": "Username",
              "example": "new_user",
              "minLength": 6,
              "maxLength": 30,
              "pattern": "0-9; A-Z; a-z; _ ; -"
            },
            "firstName": {
              "type": "string",
              "description": "First name",
              "example": "Ivan",
              "minLength": 1,
              "maxLength": 50,
              "pattern": "A-Z; a-z; А-Я ; а-я"
            },
            "lastName": {
              "type": "string",
              "description": "Last name",
              "example": "Ivanov",
              "minLength": 1,
              "maxLength": 50,
              "pattern": "A-Z; a-z; А-Я ; а-я"
            },
            "tags": {
              "type": "string",
              "description": "Hashtags",
              "example": "[#Nestjs,#MongoDB]",
              "minLength": 3,
              "maxLength": 50
            }
          },
          "required": [
            "username",
            "firstName",
            "lastName"
          ]
        },
        "ValidationPipeError": {
          "type": "object",
          "properties": {
            "field": {
              "type": "string",
              "description": "Error field"
            },
            "message": {
              "type": "string",
              "description": "Error message"
            }
          },
          "required": [
            "field",
            "message"
          ]
        },
        "BadRequestResponse": {
          "type": "object",
          "properties": {
            "timestamp": {
              "type": "string",
              "description": "Call date"
            },
            "path": {
              "type": "string",
              "description": "Called url"
            },
            "message": {
              "description": "List of errors",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ValidationPipeError"
              }
            }
          },
          "required": [
            "timestamp",
            "path",
            "message"
          ]
        },
        "ResponseHashtagDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "hashtag ID",
              "example": "529862d8-7335-41ee-9a15-32e002741380"
            },
            "normalizedTag": {
              "type": "string",
              "description": "Normalized tag"
            }
          },
          "required": [
            "id",
            "normalizedTag"
          ]
        },
        "ResponseAccessTokenDto": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string"
            }
          },
          "required": [
            "accessToken"
          ]
        },
        "UpdateMentorSettingDto": {
          "type": "object",
          "properties": {
            "helpType": {
              "type": "string",
              "description": "Help type",
              "enum": [
                "mock-interview",
                "code-interview",
                "consulting"
              ]
            },
            "videoConferenceLink": {
              "type": "string",
              "description": "Video Conference Link",
              "example": "https://www.zoom.com/id"
            },
            "liveStatus": {
              "type": "string",
              "description": "Live Status",
              "enum": [
                "active",
                "inactive"
              ]
            }
          },
          "required": [
            "helpType",
            "videoConferenceLink",
            "liveStatus"
          ]
        },
        "CreateIssueDto": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "description": "Assistance type",
              "enum": [
                "mock-interview",
                "code-interview",
                "consulting"
              ]
            },
            "title": {
              "type": "string",
              "description": "Title of the issue",
              "example": "junior react developer mock-interview"
            },
            "description": {
              "type": "string",
              "description": "Description of the issue",
              "example": "I need help for interview preparation, I need react redux and mobx"
            },
            "hashtags": {
              "description": "Hashtags for technologies",
              "example": [
                "react",
                "redux",
                "mobx"
              ],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "type",
            "title",
            "description",
            "hashtags"
          ]
        },
        "IssueResponseDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "issue ID",
              "example": "859be2b0-174e-47ad-8a5e-858405377ba4"
            },
            "type": {
              "type": "string",
              "description": "Assistance type",
              "enum": [
                "mock-interview",
                "code-interview",
                "consulting"
              ]
            },
            "title": {
              "type": "string",
              "description": "Title of the issue",
              "example": "junior react developer mock-interview"
            },
            "description": {
              "type": "string",
              "description": "Description of the issue",
              "example": "I need help for interview preparation, I need react redux and mobx"
            }
          },
          "required": [
            "id",
            "type",
            "title",
            "description"
          ]
        },
        "CreateSessionDto": {
          "type": "object",
          "properties": {
            "issueId": {
              "type": "string",
              "description": "Issue Id",
              "example": "15eddae7-0fa0-4a5d-9eb4-355ee5f7a273"
            }
          },
          "required": [
            "issueId"
          ]
        },
        "CreateSessionResponseDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "session Id",
              "example": "194437f2-c68d-4d93-8af4-d58d519e293e"
            },
            "issueId": {
              "type": "string",
              "description": "Issue Id",
              "example": "86129e60-50d5-470f-bf64-982e41f828ca"
            },
            "code": {
              "type": "string",
              "description": "code",
              "example": "cd318c33-400f-482c-82b9-49803b76812b"
            }
          },
          "required": [
            "id",
            "issueId",
            "code"
          ]
        },
        "ConnectSessionResponseDto": {
          "type": "object",
          "properties": {
            "videoConferenceLink": {
              "type": "string",
              "description": "Video Conference Link to cnnect",
              "example": "https://www.zoom.com/id"
            }
          },
          "required": [
            "videoConferenceLink"
          ]
        },
        "AllSessionResponseDto": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "session Id",
              "example": "02f4126a-df72-406e-82a7-38dab26a2fbc"
            },
            "issueId": {
              "type": "string",
              "description": "Issue Id",
              "example": "ce49bcbf-ea15-455e-acc2-119dd2957404"
            },
            "status": {
              "type": "string",
              "description": "Session status",
              "enum": [
                "created",
                "in-progress",
                "didNotShowUp",
                "closedByStudent",
                "closedByMentor"
              ]
            },
            "statusUpdateAt": {
              "type": "date",
              "description": "Status updated date",
              "example": "2024-04-09T06:54:55.690Z"
            },
            "statusByMentor": {
              "type": "string",
              "description": "Status by Mentor",
              "enum": [
                "completed",
                "cancelled"
              ]
            },
            "statusByMentee": {
              "type": "string",
              "description": "Status by Mentee",
              "enum": [
                "completed",
                "cancelled"
              ]
            },
            "issue": {
              "description": "Issue",
              "example": class IssueResponseDto {
},
              "allOf": [
                {
                  "$ref": "#/components/schemas/IssueResponseDto"
                }
              ]
            },
            "tag": {
              "description": "Hashtag",
              "example": class ResponseHashtagDto {
},
              "allOf": [
                {
                  "$ref": "#/components/schemas/ResponseHashtagDto"
                }
              ]
            }
          },
          "required": [
            "id",
            "issueId",
            "status",
            "statusUpdateAt"
          ]
        },
        "CreateFeedbackDto": {
          "type": "object",
          "properties": {
            "feedback": {
              "type": "string",
              "description": "Feedback for session",
              "example": "I am satisfied with this session"
            }
          },
          "required": [
            "feedback"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
