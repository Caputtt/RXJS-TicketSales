export interface ITour {
  name: string,
  description: string,
  tourOperator: string,
  id: string,
  price: string,
  img: string,
  _id: string,
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

export interface ITourLocation {
  id: string;
  name: string;
}
export interface ICustomTicketData extends INearestTour {
  region: ITourLocation
}
