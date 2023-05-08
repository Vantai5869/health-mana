import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleMapReact from 'google-map-react';
import { memo } from 'react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export interface IMapParams {
  coordinate: ICoordinate;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}

function Map({ coordinate }: IMapParams) {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY as string,
        }}
        defaultZoom={11}
        center={coordinate}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        <AnyReactComponent
          lat={coordinate.lat}
          lng={coordinate.lng}
          text={<FontAwesomeIcon color="red" icon={faLocationDot} size="2x" />}
        />
      </GoogleMapReact>
    </>
  );
}

export default memo(Map);
