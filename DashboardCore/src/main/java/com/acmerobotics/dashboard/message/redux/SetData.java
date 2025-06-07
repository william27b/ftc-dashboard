package com.acmerobotics.dashboard.message.redux;

import com.acmerobotics.dashboard.config.variable.DataItem;
import com.acmerobotics.dashboard.message.Message;
import com.acmerobotics.dashboard.message.MessageType;

import java.util.List;

public class SetData extends CachableMessage {
    private final List<DataItem> data;

    public SetData(List<DataItem> data) {
        super(MessageType.SET_DATA);

        this.data = data;
    }

    public List<DataItem> getData() {
        return data;
    }

    public boolean isIdentical(Message otherMessage) {
        return otherMessage instanceof SetData;
    }
}
