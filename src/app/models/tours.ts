export interface ITour {
  name: string,
  description: string,
  tourOperator: string,
  price: string,
  img: string,
  id: string,
  type: string,
  date: string,

}

export interface ITourTypeSelect {
  label?: string,
  value?: string,
  date?: string
}

export interface INearestTour extends ITour {
  locationId: string;
  location?: ITourLocation
}

export interface INearestTour extends ITour {
  locationId: string
}
export interface ICustomTicketData extends INearestTour {
  region: any
}
export interface ITourLocation {
  id: string;
  name: string;
}
