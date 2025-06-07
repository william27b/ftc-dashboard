package com.acmerobotics.dashboard.config.variable;

import java.util.UUID;

public class DataItem {
    public enum MessageType {
        NUMERICAL ("numerical"),
        NUMERICAL_SELECTION("numerical_selection"),
        QUALITATIVE ("qualitative"),
        QUALITATIVE_SELECTION("qualitative_selection");

        String type;

        MessageType(String type) {
            this.type = type;
        }

        public String getType() {
            return this.type;
        }
    }

    public enum MessageColor {
        POSITIVE("positive"),
        NEGATIVE("negative"),
        NEUTRAL("neutral"),
        INFO("info");

        String color;

        MessageColor(String color) {
            this.color = color;
        }

        public String getColor() {
            return this.color;
        }
    }

    protected MessageType type;
    protected MessageColor color;

    protected String id;

    protected String caption;
    protected Object value;
    protected String unit;

    protected String[] options;
    protected double min;
    protected double max;

    protected DataItem(MessageType type, MessageColor color, String caption, Object value, String unit, String[] options, double min, double max) {
        this.type = type;
        this.color = color;

        this.id = UUID.randomUUID().toString();

        this.caption = caption;
        this.value = value;
        this.unit = unit;

        this.options = options;
        this.min = min;
        this.max = max;
    }

    public MessageType getType() {
        return this.type;
    }

    public MessageColor getColor() {
        return this.color;
    }

    public void setColor(MessageColor color) {
        this.color = color;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaption() {
        return this.caption;
    }

    public Object getValue() {
        return this.value;
    }

    public String getUnit() {
        return this.unit;
    }

    public String[] getOptions() {
        return this.options;
    }

    public double getMin() {
        return this.min;
    }

    public double getMax() {
        return this.max;
    }
}
