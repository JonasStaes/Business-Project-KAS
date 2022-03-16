package com.ap.kas.payload.response;

import lombok.Data;

@Data
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
}
