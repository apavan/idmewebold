export class Profile {
    public lastName: string;
    public firstName: string;
    public email: string;
    public phone: string;
    public dob: string;
    public streetName: string;
    public city: string;
    public state: string;
    public zip: string;
    constructor(firstName: string, lastName: string, email: string, phone: string, dob: string,
                streetName: string, city: string, state: string, zip: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.dob = dob;
      this.streetName = streetName;
      this.city = city;
      this.state = state;
      this.zip = zip;
    }
  }
