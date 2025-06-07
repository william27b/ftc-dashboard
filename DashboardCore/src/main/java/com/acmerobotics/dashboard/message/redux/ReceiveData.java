package com.acmerobotics.dashboard.message.redux;

import com.acmerobotics.dashboard.config.variable.DataItem;
import com.acmerobotics.dashboard.message.Message;
import com.acmerobotics.dashboard.message.MessageType;
import com.acmerobotics.dashboard.telemetry.TelemetryPacket;

import java.util.List;

public class ReceiveData extends Message {
    // an empty list tells clients to clear
    private List<DataItem> data;

    public ReceiveData(List<DataItem> packets) {
        super(MessageType.RECEIVE_DATA);

        data = packets;
    }
}
