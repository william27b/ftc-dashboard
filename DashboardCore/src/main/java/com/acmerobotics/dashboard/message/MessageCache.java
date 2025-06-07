package com.acmerobotics.dashboard.message;

import com.acmerobotics.dashboard.message.redux.CachableMessage;

import java.util.ArrayList;

public class MessageCache {
    public static ArrayList<CachableMessage> messages;
    private static int cacheSize = 10;

    public static void initialize() {
        messages = new ArrayList<>();
    }

    public static void setCacheSize(int cacheSize) {
        assert cacheSize >= 0;
        MessageCache.cacheSize = cacheSize;
    }

    public static synchronized int getSize() {
        return messages.size();
    }

    public static synchronized CachableMessage getElement(int index) {
        return messages.get(index);
    }

    public static synchronized CachableMessage removeElement(int index) {
        return messages.remove(index);
    }

    public static synchronized void addMessage(CachableMessage message) {
        if (messages == null)
            MessageCache.initialize();

        int i = 0;
        int n = messages.size();

        while (i < n) {
            if (messages.get(i).isIdentical(message)) {
                messages.remove(i);
                n--;
                continue;
            }

            i++;
        }

        messages.add(message);

        while (messages.size() > cacheSize) {
            messages.remove(0);
        }
    }
}
