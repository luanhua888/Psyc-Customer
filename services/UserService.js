import AbstractService from "./AbstractService";

const API = {
  LOGIN: "FirebaseServices/loginapp",
  REGISTER: "Users/createcustomer",
  REGISTER_INFOR: "Customers/update",
  REGISTER_RESEND_CODE: "register/resend",
  REGISTER_CHECK_BY_EMAIL: "Users/checkbyemail",
  REGISTER_CONFIRM: "register/confirm",
  CHANGE_PASSWORD: "Users/changepassuser",
  PROFILE: "Users/getbyid",
  SUPPROFILE_ID: "Profiles/getbyid",
  UPDATE_PROFILE: "Profiles/update",
  UPLOAD_IMAGE: "FirebaseServices/upload",
  UPDATE_IMAGE_PROFILE: "Customers/update",
  CREATE_SUP_PROFILE: "Profiles/create",
  DAILY_HOROCOP : "DailyHoroscopes/Getalldailyhoroscopes",
  GET_USERBYID : "Customers/getbyid"
};

class UserService extends AbstractService {
  login = (username, password) => {
    return this.httpPOST(API.LOGIN, {
      userName: username,
      passWord: password,
    });
  };

  register = (username, email, password) => {
    return this.httpPOST(API.REGISTER, {
      userName: username,
      email: email,
      passWord: password,
    });
  };

  registerInfor = (
    fullname,
    email,
    address,
    dob,
    latitude,
    longitude,
    imageUrl
  ) => {
    return this.httpPUT(API.REGISTER_INFOR, {
       fullname: fullname,
      email: email,
      address: address,
      dob: dob,
      latitude: latitude,
      longitude: longitude,
      imageUrl: imageUrl,
    });
  };

  registerResendCode = (email) => {
    return this.httpPOST(
      API.REGISTER_RESEND_CODE,
      {},
      {
        params: {
          email,
        },
      }
    );
  };
  
  PostSupProfile = (name, birthPlace, dob, latitude, longitude, gender , customerId) => {
    return this.httpPOST(
      API.CREATE_SUP_PROFILE,
      {
        name: name,
        birthPlace: birthPlace,
        dob: dob,
        latitude: latitude,
        longitude: longitude,
        gender: gender,
        customerId: customerId,
      },
      
    );
  };

  registerConfirm = (email, code) => {
    return this.httpPUT(API.REGISTER_CONFIRM, {
      email,
      code,
    });
  };

  changePassword = (email, code, password) => {
    return this.httpPUT(API.CHANGE_PASSWORD, {
      email,
      code: `${code}`,
      passWord: password,
    });
  };

  registerCheckByEmail = (email) => {
    return this.httpGET(API.REGISTER_CHECK_BY_EMAIL, { email });
  };

  profile = (id) => {
    return this.httpGET(API.PROFILE, { id });
  };

  customerUpdate = (data, email) => {
    return this.httpPUT(API.REGISTER_INFOR, { ...data, email });
  };

  profileUpdate = (data, id) => {
    return this.httpPUT(API.UPDATE_PROFILE, { ...data, id });
  };

  supProfileId = (id) => {
    return this.httpGET(API.SUPPROFILE_ID, { id });
  };

  updateImageProfile = (email, imageUrl) => {
    return this.httpPUT(API.REGISTER_INFOR, {
      email: email,
      imageUrl: imageUrl,
    });
  };



  //upload file image to firebase

  uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpPOST(API.UPLOAD_IMAGE, formData);
  };

  changePasswordAlLogin = (userName, oldPassword, newPassword) => {
    return this.httpPUT(API.CHANGE_PASSWORD, {
      userName: userName,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  }

  getDailyHorocop= (id, date) => {
    return this.httpGET(API.DAILY_HOROCOP,{ id:id, date:date });
  }


  getZodiacId = (id) => {
    return this.httpGET(API.GET_USERBYID, { id });
  }



}

export const userService = new UserService();
