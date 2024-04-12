
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
      "/user": {
        "put": {
          "operationId": "UserController_update",
          "summary": "Update user profile",
          "description": "Отправляем firstName, lastName, username*, tags[]",
          "parameters": [],
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
              "name": "order",
              "required": false,
              "in": "query",
              "schema": {
                "default": "ASC",
                "enum": [
                  "ASC",
                  "DESC"
                ],
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "minimum": 1,
                "default": 1,
                "type": "number"
              }
            },
            {
              "name": "take",
              "required": false,
              "in": "query",
              "schema": {
                "minimum": 1,
                "maximum": 50,
                "default": 10,
                "type": "number"
              }
            },
            {
              "name": "searchTitleTerm",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successfully received model list",
              "content": {
                "application/json": {
                  "schema": {
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/PageDto"
                      },
                      {
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/CreateHashtagDto"
                            }
                          }
                        }
                      }
                    ]
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
      "/mentor-setting": {
        "post": {
          "operationId": "MentorSettingController_createMentorSetting",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Mentor Settings"
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
            "company": {
              "type": "string",
              "description": "Company name",
              "example": "IT Incubator",
              "minLength": 1,
              "maxLength": 50
            },
            "hashtags": {
              "type": "string",
              "description": "Hashtags",
              "example": "[#Nestjs,#MongoDB]",
              "minLength": 3,
              "maxLength": 50
            },
            "tier": {
              "type": "string",
              "description": "User Level",
              "enum": [
                "Trainee",
                "Junior",
                "Middle",
                "Senior"
              ]
            },
            "coin": {
              "type": "number",
              "description": "Earned coins",
              "example": 5
            }
          },
          "required": [
            "username",
            "firstName",
            "lastName",
            "tier",
            "coin"
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
        "PageMetaDto": {
          "type": "object",
          "properties": {
            "page": {
              "type": "number"
            },
            "take": {
              "type": "number"
            },
            "itemCount": {
              "type": "number"
            },
            "pageCount": {
              "type": "number"
            },
            "hasPreviousPage": {
              "type": "boolean"
            },
            "hasNextPage": {
              "type": "boolean"
            }
          },
          "required": [
            "page",
            "take",
            "itemCount",
            "pageCount",
            "hasPreviousPage",
            "hasNextPage"
          ]
        },
        "PageDto": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "array"
              }
            },
            "meta": {
              "$ref": "#/components/schemas/PageMetaDto"
            }
          },
          "required": [
            "data",
            "meta"
          ]
        },
        "CreateHashtagDto": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Hashtag title"
            },
            "normalized": {
              "type": "string",
              "description": "Hashtag normalized"
            }
          },
          "required": [
            "title",
            "normalized"
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
              "example": "d77e1bf8-5c1d-4332-be49-ef7c1c461dec"
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
              "example": "be749943-feb0-4c32-bbc3-2b1d0e81d53b"
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
              "example": "1657f23d-3795-4ebf-8653-80e6588f1476"
            },
            "issueId": {
              "type": "string",
              "description": "Issue Id",
              "example": "eae9e17b-36fc-41d1-a257-2dcde652a4c6"
            },
            "code": {
              "type": "string",
              "description": "code",
              "example": "cb4ad6c6-eaee-44ca-a5b0-4c6651646103"
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
              "example": "8706827d-ff4b-4a05-84c4-98bbe79ec6d1"
            },
            "issueId": {
              "type": "string",
              "description": "Issue Id",
              "example": "f1e2f81c-324d-4ba7-bdd3-b43ae5105048"
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
              "example": "2024-04-12T05:31:35.681Z"
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
            "hashtag": {
              "description": "Hashtag",
              "example": class CreateHashtagDto {
},
              "allOf": [
                {
                  "$ref": "#/components/schemas/CreateHashtagDto"
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
