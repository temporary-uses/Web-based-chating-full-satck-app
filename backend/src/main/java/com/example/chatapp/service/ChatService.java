package com.example.chatapp.service;

import com.example.chatapp.dto.MessageRequest;
import com.example.chatapp.model.ChatMessage;
import com.example.chatapp.repository.ChatMessageRepository;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessage saveMessage(MessageRequest request) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setSender(request.getSender().trim());
        chatMessage.setContent(request.getContent().trim());
        return chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getRecentMessages() {
        List<ChatMessage> messages = chatMessageRepository.findTop50ByOrderByCreatedAtDesc();
        messages.sort(Comparator.comparing(ChatMessage::getCreatedAt));
        return messages;
    }
}
