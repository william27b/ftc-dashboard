package com.acmerobotics.dashboard;

import com.acmerobotics.dashboard.config.variable.DataItem;
import com.acmerobotics.dashboard.config.variable.NumericalData;
import com.acmerobotics.dashboard.config.variable.NumericalSelector;
import com.acmerobotics.dashboard.config.variable.QualitativeData;
import com.acmerobotics.dashboard.config.variable.QualitativeSelector;
import com.acmerobotics.dashboard.message.MessageCache;
import com.acmerobotics.dashboard.message.redux.CachableMessage;
import com.acmerobotics.dashboard.message.redux.ReceiveData;
import com.acmerobotics.dashboard.message.redux.SetData;

import java.util.ArrayList;
import java.util.List;

public class PestoDashCore {
    private List<DataItem> items;
    private List<DataItem> modifiedItems;

    private List<SendFun> sockets;

    public static PestoDashCore instance;

    private PestoDashCore() {
        this.items = new ArrayList<>();
        this.modifiedItems = new ArrayList<>();
        this.sockets = new ArrayList<>();
    }

    public void addSocket(SendFun socket) {
        this.sockets.add(socket);
    }

    public static void reset() {
        if (PestoDashCore.instance == null)
            return;

        PestoDashCore.instance.items.clear();
        PestoDashCore.instance.modifiedItems.clear();

        PestoDashCore.instance.sockets.clear();
    }

    public static PestoDashCore getInstance() {
        if (PestoDashCore.instance == null)
            PestoDashCore.instance = new PestoDashCore();

        return PestoDashCore.instance;
    }

    public static void addItem(DataItem item) {
        getInstance().items.add(item);
    }

    public static DataItem getItem(String id) {
        for (DataItem item: getInstance().modifiedItems) {
            if (item.getId().equals(id))
                return item;
        }

        return null;
    }

    private static void processModifications() {
        int i = 0;

        while (i < MessageCache.getSize()) {
            CachableMessage message = MessageCache.getElement(i);
            i++;

            if (!(message instanceof SetData))
                continue;

            SetData setData = (SetData) message;
            getInstance().modifiedItems = setData.getData();
        }
    }

    public static void clear() {
        List<DataItem> retainedItems = new ArrayList<>();

        for (DataItem dataItem: getInstance().items) {
            if (dataItem instanceof NumericalSelector || dataItem instanceof QualitativeSelector)
                retainedItems.add(dataItem);
        }

        getInstance().items = retainedItems;
    }

    public static void clearAll() {
        getInstance().items.clear();
    }

    public static void update() {
        for (SendFun sendFun: getInstance().sockets) {
            sendFun.send(new ReceiveData(getInstance().items));
        }

        processModifications();
    }
}
