package com.acmerobotics.dashboard.config.variable;

public class QualitativeData extends DataItem {
    private QualitativeData(MessageType type, MessageColor color, String caption, Object value, String unit, String[] options, double min, double max) {
        super(type, color, caption, value, unit, options, min, max);
    }

    public QualitativeData(String caption, String value) {
        super(
                MessageType.QUALITATIVE,
                MessageColor.NEUTRAL,
                caption,
                value,
                "",
                null,
                0,
                0
        );
    }
}
