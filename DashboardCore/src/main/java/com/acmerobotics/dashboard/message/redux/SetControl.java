package com.acmerobotics.dashboard.message.redux;

import com.acmerobotics.dashboard.message.Message;
import com.acmerobotics.dashboard.message.MessageType;

public class SetControl extends CachableMessage {
    private final String controlType;

    public SetControl() {
        super(MessageType.SET_MOTOR);

        this.controlType = "";
    }

    public SetControl(String controlType) {
        super(MessageType.SET_MOTOR);

        this.controlType = controlType;
    }

    public String getControlType() {
        return controlType;
    }

    public boolean isIdentical(Message otherMessage) {
        if (otherMessage.getType() != this.getType())
            return false;

        return controlType.equals(((SetControl) otherMessage).getControlType());
    }
}
