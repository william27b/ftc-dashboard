import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import BaseView, {
  BaseViewHeading,
  BaseViewBody,
  BaseViewIcons,
  BaseViewIconButton,
  BaseViewProps,
  BaseViewHeadingProps,
} from '@/components/views/BaseView';
import TextInput from '@/components/views/ConfigView/inputs/TextInput';

import { ReactComponent as ChartIcon } from '@/assets/icons/chart.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg';
import { ReactComponent as PlayIcon } from '@/assets/icons/play_arrow.svg';
import { ReactComponent as PauseIcon } from '@/assets/icons/pause.svg';

import { RootState } from '@/store/reducers';
import { colors, ThemeConsumer } from '@/hooks/useTheme';
import { DEFAULT_OPTIONS } from './Integration';
import { validateInt, ValResult } from '@/components/inputs/validation';

type IntegrationViewState = {
  Integrationing: boolean;
  paused: boolean;
  pausedTime: number;
  availableKeys: string[];
  selectedKeys: string[];
  windowMs: ValResult<number>;
};

const mapStateToProps = (state: RootState) => ({
  telemetry: state.telemetry,
});

const connector = connect(mapStateToProps);

type IntegrationViewProps = ConnectedProps<typeof connector> &
  BaseViewProps &
  BaseViewHeadingProps;

class IntegrationView extends Component<
  IntegrationViewProps,
  IntegrationViewState
> {
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: IntegrationViewProps) {
    super(props);

    this.state = {
      Integrationing: false,
      paused: false,
      pausedTime: 0,
      availableKeys: [],
      selectedKeys: [],
      windowMs: {
        value: DEFAULT_OPTIONS.windowMs,
        valid: true,
      },
    };

    this.containerRef = React.createRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps: IntegrationViewProps) {
    if (this.props.telemetry === prevProps.telemetry) return;

    this.setState((state) => {
      if (this.props.telemetry.length === 0) {
        return { availableKeys: [], selectedKeys: [] };
      }

      const availableKeys = [...state.availableKeys];
      for (const { data } of this.props.telemetry) {
        for (const k of Object.keys(data)) {
          if (isNaN(parseFloat(data[k]))) continue;

          if (availableKeys.includes(k)) continue;

          availableKeys.push(k);
        }
      }

      return {
        availableKeys,
        selectedKeys: state.selectedKeys,
      };
    });
  }

  render() {
    return (
      <BaseView
        className="flex flex-col overflow-auto"
        isUnlocked={this.props.isUnlocked}
        ref={this.containerRef}
        tabIndex={0}
      >
        <div className="flex">
          <BaseViewHeading isDraggable={this.props.isDraggable}>
            Integration
          </BaseViewHeading>
        </div>
      </BaseView>
    );
  }
}

export default connector(IntegrationView);
