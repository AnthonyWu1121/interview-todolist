import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    "openapi": "3.0.0",
    "info": {
        "version": "1.0.0",
        "title": "todo list API document",
        "description": "User APIs"
    },
    "servers": [
        {"url": "http://localhost:3000/api"}
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API for users"
        }, {
            "name": "Tasks",
            "description": "API for tasks"
        }, {
            "name": "Logs",
            "description": "API for logs"
        }
    ],
    "paths": {
        "/user/addnew": {
            "post": {
                "tags": ["Users"],
                "description": "Add new user",
                "requestBody": {
                    "required": true,
                    "content": {
                        "applicaion/json": {
                            "schema": {
                                "$ref": "#/definitions/userreq"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string",
                                    "example": "new user added"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/user/remove": {
            "delete": {
                "tags": ["Users"],
                "description": "Remove user",
                "requestBody": {
                    "required": true,
                    "content": {
                        "applicaion/json": {
                            "schema": {
                                "$ref": "#/definitions/userreq"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string",
                                    "example": "user removed"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/task/addnew": {
            "post": {
                "tags": ["Tasks"],
                "description": "Add new task",
                "requestBody": {
                    "required": true,
                    "content": {
                        "applicaion/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string"
                                    },
                                    "creator": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string",
                                    "example": "new task added"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/task/remove": {
            "delete": {
                "tags": ["Tasks"],
                "description": "Remove task",
                "requestBody": {
                    "required": true,
                    "content": {
                        "applicaion/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "taskId": {
                                        "type": "number",
                                    },
                                    "userId": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string",
                                    "example": "task removed"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/task/all": {
            "get": {
                "tags": ["Tasks"],
                "description": "Get all tasks",
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "array": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "number",
                                            },
                                            "title": {
                                                "type": "string",
                                            },
                                            "duetime": {
                                                "type": "string",
                                                "format": "date-time"
                                            },
                                            "creator": {
                                                "type": "number",
                                            },
                                            "createdAt": {
                                                "type": "string",
                                                "format": "date-time"
                                            },
                                            "updatedAt": {
                                                "type": "string",
                                                "format": "date-time"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/task/editTitle": {
            "put": {
                "tags": ["Tasks"],
                "description": "Edit task title",
                "requestBody": {
                    "required": true,
                    "content": {
                        "applicaion/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "number",
                                    },
                                    "newTitle": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "text/plain": {
                                "schema": {
                                    "type": "string",
                                    "example": "Edited task title"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/log/all": {
            "get": {
                "tags": ["Logs"],
                "description": "Get all logs",
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "array": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "type": "number",
                                            },
                                            "description": {
                                                "type": "string",
                                            },
                                            "taskId": {
                                                "type": "number",
                                            },
                                            "commentId": {
                                                "type": "number",
                                            },
                                            "createdAt": {
                                                "type": "string",
                                                "format": "date-time"
                                            },
                                            "updatedAt": {
                                                "type": "string",
                                                "format": "date-time"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    "definitions": {
        "userreq": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                }
            }
        }
    }
}

const options = {
    swaggerDefinition,
    apis: ['./index.js']
}

const swaggerDoc = swaggerJSDoc(options);
export default swaggerDoc;