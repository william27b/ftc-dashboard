
package com.acmerobotics.dashboard.config.variable;

public class QualitativeSelector extends DataItem {
    private QualitativeSelector(MessageType type, MessageColor color, String caption, Object value, String unit, String[] options, double min, double max) {
        super(type, color, caption, value, unit, options, min, max);
    }

    public QualitativeSelector(String caption, String value) {
        super(
                MessageType.QUALITATIVE_SELECTION,
                MessageColor.NEUTRAL,
                caption,
                value,
                "",
                null,
                0,
                0
        );
    }

    public QualitativeSelector(String caption, String value, String[] options) {
        super(
                MessageType.QUALITATIVE_SELECTION,
                MessageColor.NEUTRAL,
                caption,
                value,
                "",
                options,
                0,
                0
        );
    }
}
