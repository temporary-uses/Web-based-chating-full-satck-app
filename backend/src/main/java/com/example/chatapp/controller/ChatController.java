package com.example.chatapp.controller;

import com.example.chatapp.dto.MessageRequest;
import com.example.chatapp.model.ChatMessage;
import com.example.chatapp.service.ChatService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/messages")
public class ChatController {

    private static final String TOPIC = "/topic/public";

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public List<ChatMessage> getRecentMessages() {
        return chatService.getRecentMessages();
    }

    @MessageMapping("/chat.send")
    public void sendMessage(@Valid @Payload MessageRequest request) {
        ChatMessage saved = chatService.saveMessage(request);
        messagingTemplate.convertAndSend(TOPIC, saved);
    }
}
