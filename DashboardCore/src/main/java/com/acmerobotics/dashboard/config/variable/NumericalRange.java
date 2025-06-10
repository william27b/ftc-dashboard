package com.acmerobotics.dashboard.config.variable;

public class NumericalRange extends DataItem {
    private NumericalRange(MessageType type, MessageColor color, String caption, Object value, String unit, String[] options, double min, double max) {
        super(type, color, caption, value, unit, options, min, max);
    }

    public NumericalRange(String caption, double value, double min, double max) {
        super(
                MessageType.NUMERICAL_RANGE,
                MessageColor.NEUTRAL,
                caption,
                value,
                "",
                null,
                min,
                max
        );

        assert min != Double.NEGATIVE_INFINITY;
        assert min != Double.POSITIVE_INFINITY;
        assert !Double.isNaN(min);

        assert max != Double.NEGATIVE_INFINITY;
        assert max != Double.POSITIVE_INFINITY;
        assert !Double.isNaN(max);
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
