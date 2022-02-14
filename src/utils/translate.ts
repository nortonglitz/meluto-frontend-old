export const translateAmenities = (item: string) => {
  switch (item) {
    case 'pool':
      return 'Piscina'
    case 'barbecue':
      return 'Churrasqueira'
    case 'sportsCourt':
      return 'Quadra Poliesportiva'
    case 'gym':
      return 'Academia'
    case 'sauna':
      return 'Sauna'
    case 'elevator':
      return 'Elevador'
    case 'movieRoom':
      return 'Sala de Cinema'
    case 'gameRoom':
      return 'Sala de Jogos'
    case 'ofuro':
      return 'Ofurô'
    case 'hotTub':
      return 'Hidromassagem'
    case 'fireplace':
      return 'Lareira'
    case 'heater':
      return 'Aquecedor'
    case 'airConditioner':
      return 'Ar Condicionado'
    case 'ceilingFan':
      return 'Ventilador de Teto'
    default:
      return 'Not found'
  }
}

export const translateNearby = (item: string) => {
  switch (item) {
    case 'market':
      return 'Mercado'
    case 'bank':
      return 'Banco'
    case 'metro':
      return 'Metrô'
    case 'club':
      return 'Clube'
    case 'airport':
      return 'Aeroporto'
    case 'busStop':
      return 'Ponto de Ônibus'
    case 'gym':
      return 'Academia'
    case 'mall':
      return 'Shopping'
    case 'restaurant':
      return 'Restaurante'
    case 'bakery':
      return 'Padaria'
    case 'beach':
      return 'Praia'
    case 'stadium':
      return 'Estádio'
    case 'dam':
      return 'Represa'
    case 'river':
      return 'Rio'
    case 'park':
      return 'Parque'
    case 'naturalReserve':
      return 'Reserva Natural'
    case 'hill':
      return 'Colina'
    default:
      return 'Not found'
  }
}

export const translateSafety = (item: string) => {
  switch (item) {
    case 'cctv':
      return 'Câmeras de Vigilância'
    case 'security24':
      return 'Segurança 24h'
    case 'gatedCommunity':
      return 'Condomínio Fechado'
    case 'electronicGate':
      return 'Portão Eletrônico'
    case 'alarm':
      return 'Alarme'
    case 'electricFence':
      return 'Cerca Elétrica'
    default:
      return 'Not found'
  }
}

export const translateSpecialFeature = (item: string) => {
  switch (item) {
    case 'furnished':
      return 'Mobiliado'
    case 'offPlan':
      return 'Planta'
    case 'renovated':
      return 'Reformado'
    case 'seaFront':
      return 'Beira-mar'
    case 'launch':
      return 'Lançamento'
    default:
      return 'Not found'
  }
}
