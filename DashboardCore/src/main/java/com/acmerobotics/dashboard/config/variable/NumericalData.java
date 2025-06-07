package com.acmerobotics.dashboard.config.variable;

public class NumericalData extends DataItem {
    private NumericalData(MessageType type, MessageColor color, String caption, Object value, String unit, String[] options, double min, double max) {
        super(type, color, caption, value, unit, options, min, max);
    }

    public NumericalData(String caption, double value) {
        super(
                MessageType.NUMERICAL,
                MessageColor.NEUTRAL,
                caption,
                value,
                "",
                null,
                0,
                0
        );
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
