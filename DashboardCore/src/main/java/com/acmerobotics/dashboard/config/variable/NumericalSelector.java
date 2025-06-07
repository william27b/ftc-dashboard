package com.acmerobotics.dashboard.config.variable;

public class NumericalSelector extends DataItem {
    private NumericalSelector(MessageType type, MessageColor color, String caption, Object value, String unit, String[] options, double min, double max) {
        super(type, color, caption, value, unit, options, min, max);
    }

    public NumericalSelector(String caption, double value, double min, double max) {
        super(
                MessageType.NUMERICAL_SELECTION,
                MessageColor.NEUTRAL,
                caption,
                value,
                "",
                null,
                min,
                max
        );
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
