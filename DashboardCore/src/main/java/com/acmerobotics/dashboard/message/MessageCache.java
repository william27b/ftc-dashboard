package com.acmerobotics.dashboard.message;

import com.acmerobotics.dashboard.message.redux.CachableMessage;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;

public class MessageCache {
    public static ArrayList<CachableMessage> messages;
    private static int cacheSize = 4;

    public static void initialize() {
        messages = new ArrayList<>();
    }

    public static void setCacheSize(int cacheSize) {
        MessageCache.cacheSize = cacheSize;
    }

    public static void addMessage(CachableMessage message) {
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

        if (messages.size() > cacheSize) {
            messages.remove(0);
        }
    }
}
