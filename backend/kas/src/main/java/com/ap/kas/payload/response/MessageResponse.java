package com.ap.kas.payload.response;

public class MessageResponse {
    private String message;

    private Object data;

    public MessageResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }

    public MessageResponse(String message) {
        this(message, null);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "message: " + message + "\ndata: " + data.toString();
    }

}
