package com.acmerobotics.dashboard.message.redux;

import com.acmerobotics.dashboard.message.Message;
import com.acmerobotics.dashboard.message.MessageType;

public abstract class CachableMessage extends Message {
    public CachableMessage(MessageType type) {
        super(type);
    }

    public abstract boolean isIdentical(Message otherMessage);
}
