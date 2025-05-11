import React, { Component, useState, useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import BaseView, {
  BaseViewHeading,
  BaseViewProps,
  BaseViewHeadingProps,
} from '@/components/views/BaseView';

import { RootState, useAppDispatch } from '@/store/reducers';
import { DEFAULT_OPTIONS } from './Integration';

import '@/components/views/IntegrationView/Integration.css';
import strafer from '@/components/views/IntegrationView/assets/strafer.png';

import { SetMotorAction } from '@/store/types/integration';

const mapStateToProps = (state: RootState) => ({
  telemetry: state.telemetry,
});

const connector = connect(mapStateToProps);

type IntegrationViewProps = ConnectedProps<typeof connector> &
  BaseViewProps &
  BaseViewHeadingProps;

class IntegrationView extends Component<IntegrationViewProps> {
  // containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: IntegrationViewProps) {
    super(props);

    // this.containerRef = React.createRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate() {}

  Ranges = () => {
    let [wheelPowers, setWheelPowers] = useState([50.0, 50.0, 50.0, 50.0]);
    let [dimensions, setDimensions] = useState(0.0);

    const dispatch = useAppDispatch();

    useEffect(() => {
      const update = () => setDimensions(getImageData());
      setTimeout(update, 100);
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);

    let getImageData = (): number => {
      let image = document.getElementById('strafer');
      if (!image) {
        console.log('here');
        return 0;
      }

      let widthString: String =
        getComputedStyle(image).getPropertyValue('width');

      let width: number = Number(
        widthString.substring(0, widthString.length - 2),
      );

      let heightString: String =
        getComputedStyle(image).getPropertyValue('height');

      let height: number = Number(
        heightString.substring(0, heightString.length - 2),
      );

      return Math.min(width, height);
    };

    return (
      <>
        <div
          style={{
            position: 'relative',
            top: 0.093 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              height: dimensions * 0.195 + 'px',
            }}
            onChange={(e) => {
              setWheelPowers([
                Number(e.target.value),
                wheelPowers[1],
                wheelPowers[2],
                wheelPowers[3],
              ]);

              // dispatch({
              //   type: 'SET_MOTOR',
              //   name: '',
              //   power: 0.0,
              // });
            }}
          />
          <p
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[0] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[0] >= 50
              ? String(wheelPowers[0] / 50 - 1).substring(0, 4)
              : String(wheelPowers[0] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            top: 0.093 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              width: '16px',
              height: dimensions * 0.195 + 'px',
            }}
            onChange={(e) => {
              setWheelPowers([
                wheelPowers[0],
                Number(e.target.value),
                wheelPowers[2],
                wheelPowers[3],
              ]);
            }}
          />
          <p
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[1] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[1] >= 50
              ? String(wheelPowers[1] / 50 - 1).substring(0, 4)
              : String(wheelPowers[1] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            top: 0.707 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              height: dimensions * 0.195 + 'px',
            }}
            onChange={(e) => {
              setWheelPowers([
                wheelPowers[0],
                wheelPowers[1],
                Number(e.target.value),
                wheelPowers[3],
              ]);
            }}
          />
          <p
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[2] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[2] >= 50
              ? String(wheelPowers[2] / 50 - 1).substring(0, 4)
              : String(wheelPowers[2] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            top: 0.707 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              width: '16px',
              height: dimensions * 0.195 + 'px',
            }}
            onChange={(e) => {
              setWheelPowers([
                wheelPowers[0],
                wheelPowers[1],
                wheelPowers[2],
                Number(e.target.value),
              ]);
            }}
          />
          <p
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[3] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[3] >= 50
              ? String(wheelPowers[3] / 50 - 1).substring(0, 4)
              : String(wheelPowers[3] / 50 - 1).substring(0, 5)}
          </p>
        </div>
      </>
    );
  };

  render() {
    return (
      <BaseView
        className="flex flex-col overflow-auto"
        isUnlocked={this.props.isUnlocked}
        // ref={this.containerRef}
        tabIndex={0}
        // onMouseDown={() => {
        // console.log(this.props.telemetry);
        // }}
      >
        <div className="flex">
          <BaseViewHeading isDraggable={this.props.isDraggable}>
            Integration
            {/* <div
              className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700"
              style={{
                margin: '10%',
                width: '80%',
              }}
            >
              <div
                className="h-2.5 rounded-full bg-green-600"
                style={{
                  width: '99%',
                }}
              ></div>
            </div> */}
            {/* <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
              <circle r="25" cx="50" cy="50" fill="rgb(37, 99, 235)" />
              <rect
                width="50"
                height="10"
                x="5"
                y="45"
                rx="2"
                ry="2"
                fill="rgb(37, 99, 235)"
                style={{
                  animation: `spinReverse 2s linear infinite`,
                }}
              />
              <rect
                width="15"
                height="30"
                x="5"
                y="35"
                rx="4"
                ry="4"
                fill="rgb(37, 99, 235)"
                style={{
                  animation: `spinReverse 2s linear infinite`,
                }}
              />
              <circle r="20" cx="50" cy="50" fill="#FFFFFF" />
              <text x="41.5" y="57" fill="black">
                M
              </text>
            </svg> */}
            <img
              src={strafer}
              id="strafer"
              style={{
                transform: 'rotate(90deg)',
                position: 'absolute',
                left: '0px',
                right: '0px',
                height: '80%',
                marginLeft: 'auto',
                marginRight: 'auto',
                objectFit: 'contain',
                // backgroundColor: 'black',
              }}
            ></img>
            <this.Ranges />
          </BaseViewHeading>
        </div>
      </BaseView>
    );
  }
}

export default connector(IntegrationView);
