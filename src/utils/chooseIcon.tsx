import React from 'react'
import {
  Pool,
  Check,
  Grill,
  ElevatorPassenger,
  Dumbbell,
  HotTub,
  Theater,
  GamepadVariant,
  Radiator,
  Fireplace,
  AirConditioner,
  SoccerField,
  CeilingFan,
  Thermometer,
  CartVariant,
  Shopping,
  Bank,
  SubwayVariant,
  BusStopCovered,
  Airport,
  ImageFilterHdr,
  Soccer,
  SilverwareForkKnife,
  Baguette,
  Beach,
  StadiumVariant,
  NaturePeople,
  Waves,
  Tree,
  AlarmLight,
  Cctv,
  PoliceBadge,
  Gate,
  FenceElectric,
  Lock,
  SofaSingle,
  MathCompass,
  HomeModern,
  Star
} from 'mdi-material-ui'
import { SvgIconProps } from '@mui/material'

interface IChooseIcon extends SvgIconProps {
  item: string
}

export const AmenitiesIcon: React.FC<IChooseIcon> = ({ item, ...props }) => {
  switch (item) {
    case 'pool':
      return <Pool {...props}/>
    case 'barbecue':
      return <Grill {...props}/>
    case 'sportsCourt':
      return <SoccerField {...props}/>
    case 'gym':
      return <Dumbbell {...props}/>
    case 'sauna':
      return <Thermometer {...props}/>
    case 'elevator':
      return <ElevatorPassenger {...props}/>
    case 'movieRoom':
      return <Theater {...props}/>
    case 'gameRoom':
      return <GamepadVariant {...props}/>
    case 'ofuro':
      return <HotTub {...props}/>
    case 'hotTub':
      return <HotTub {...props}/>
    case 'fireplace':
      return <Fireplace {...props}/>
    case 'heater':
      return <Radiator {...props}/>
    case 'airConditioner':
      return <AirConditioner {...props}/>
    case 'ceilingFan':
      return <CeilingFan {...props}/>
    default:
      return <Check {...props}/>
  }
}

export const NearbyIcon: React.FC<IChooseIcon> = ({ item, ...props }) => {
  switch (item) {
    case 'market':
      return <CartVariant {...props}/>
    case 'mall':
      return <Shopping {...props}/>
    case 'bank':
      return <Bank {...props}/>
    case 'gym':
      return <Dumbbell {...props}/>
    case 'metro':
      return <SubwayVariant {...props}/>
    case 'busStop':
      return <BusStopCovered {...props}/>
    case 'airport':
      return <Airport {...props}/>
    case 'restaurant':
      return <SilverwareForkKnife {...props}/>
    case 'bakery':
      return <Baguette {...props}/>
    case 'beach':
      return <Beach {...props}/>
    case 'stadium':
      return <StadiumVariant {...props}/>
    case 'park':
      return <NaturePeople {...props}/>
    case 'river':
      return <Waves {...props}/>
    case 'dam':
      return <Waves {...props}/>
    case 'naturalReserve':
      return <Tree {...props}/>
    case 'hill':
      return <ImageFilterHdr {...props}/>
    case 'club':
      return <Soccer {...props}/>
    default:
      return <Check {...props}/>
  }
}

export const SafetyIcon: React.FC<IChooseIcon> = ({ item, ...props }) => {
  switch (item) {
    case 'cctv':
      return <Cctv {...props}/>
    case 'security24':
      return <PoliceBadge {...props}/>
    case 'gatedCommunity':
      return <Lock {...props}/>
    case 'electronicGate':
      return <Gate {...props}/>
    case 'alarm':
      return <AlarmLight {...props}/>
    case 'electricFence':
      return <FenceElectric {...props}/>
    default:
      return <Check {...props}/>
  }
}

export const SpecialFeatureIcon: React.FC<IChooseIcon> = ({ item, ...props }) => {
  switch (item) {
    case 'furnished':
      return <SofaSingle {...props}/>
    case 'offPlan':
      return <MathCompass {...props}/>
    case 'renovated':
      return <HomeModern {...props}/>
    case 'seaFront':
      return <Beach {...props}/>
    case 'launch':
      return <Star {...props}/>
    default:
      return <Check {...props}/>
  }
}
