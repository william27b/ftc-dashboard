package com.acmerobotics.dashboard.message.redux;

import com.acmerobotics.dashboard.message.Message;
import com.acmerobotics.dashboard.message.MessageType;

public class SetMotor extends CachableMessage {
    private final String name;
    private final double power;
    
    public SetMotor(String name, double power) {
        super(MessageType.SET_MOTOR);

        this.name = name;
        this.power = power;
    }

    public String getName() {
        return name;
    }

    public double getPower() {
        return power;
    }

    public boolean isIdentical(Message otherMessage) {
        if (otherMessage.getType() != this.getType())
            return false;

        return name.equals(((SetMotor) otherMessage).getName());
    }
}
