import React from 'react';

import Home from './pages/Home';

import {

  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import StudentState from './context/StudentState';
import UserState from './context/UserState';
import Admin from './pages/admin';
import AddStudent from './pages/AddStudent';
import AllStudentRecords from './pages/AllStudentRecords';
import UpdateData from './pages/updateData';
import MainUpdateForm from './pages/mainUpdateForm';
import DeleteStudentRecord from './pages/DeleteStudentRecord';
import UpdateGeneralData from './pages/UpdateGeneralData';
import UpdateEmail from './pages/UpdateEmail';
import UpdateMobile from './pages/UpdateMobile';
import UpdatePassword from './pages/UpdatePassword';
import AddActivity from './pages/AddActivity';
import UpdateCoActivity from './pages/UpdateCoActivity';
import ViewActiviy from './pages/ViewActivity';
import UpdateActivityForm from './pages/UpdateActivityForm';
import DeleteInsertRecords from './pages/deleteInsertRecord';
import DeleteCoACtivity from './pages/DeleteCoACtivity';
import InsertRecords from './pages/InsertRecords';
import InsertRecordDataForm from './pages/InsertRecordDataForm';
import ViewSpecficInsertRecords from './pages/ViewSpecficInsertRecords';
import UpdateInsertRecord from './pages/UpdateInsertRecords';
import UpdateInsertRecordForm from './pages/UpdateInsertRecordForm';
import PersonalRecord from './pages/PersonalRecord';
import MonthWiseList from './pages/MonthWiseList';
import FilterStudent from './pages/FilterStudent';
import DownloadPdfActivity from './pages/DownloadPdfActivity';
import PrintTemplate from './pages/PrintTemplate';
import ThisMonth from './pages/ThisMonth';
import NotPay from './pages/NotPay';
function App() {
  return (
  <>
  <StudentState>
  <UserState>
    <div className="App">
     <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addStudent" element={<AddStudent />} />
      <Route path="/mainUpdateForm" element={<MainUpdateForm />} />
      <Route path="/updateStudent" element={<UpdateData />} />
      <Route path="/deleteStudent" element={<DeleteStudentRecord />} />
      <Route path="/updateGeneralData" element={<UpdateGeneralData />} />
      <Route path="/updateEmailId" element={<UpdateEmail />} />
      <Route path="/updateMobileNumer" element={<UpdateMobile />} />
      <Route path="/updatePassword" element={<UpdatePassword />} />
      <Route path="/allStudentRecords" element={<AllStudentRecords />} />
      <Route path="/addActivity" element={<AddActivity />} />
      <Route path="/updateCoActivity" element={<UpdateCoActivity />} />
      <Route path="/insertRecords" element={<InsertRecords />} />
      <Route path="/insertRecordDataForm" element={<InsertRecordDataForm />} />
      <Route path="/viewSpecificRecords" element={<ViewSpecficInsertRecords />} />
      <Route path="/deleteInsertRecord" element={< DeleteInsertRecords/>} />
          <Route path="/updateInsertRecord" element={< UpdateInsertRecord/>} />
          <Route path="/updateInsertRecordForm" element={< UpdateInsertRecordForm/>} />
      <Route path="/deleteCoActivity" element={<DeleteCoACtivity />} />
      <Route path="/personalRecord" element={<PersonalRecord />} />
      <Route path="/monthwise" element={<MonthWiseList />} />
      <Route path="/viewActivity" element={<ViewActiviy />} />
      <Route path="/updateCoActivityForm" element={<UpdateActivityForm />} />
      <Route path="/filterStudent" element={<FilterStudent />} />
      <Route path="/printTemplate" element={<PrintTemplate />} />
      <Route path="/thisMonth" element={<ThisMonth />} />
      <Route path="/notPay" element={<NotPay />} />
      <Route path="/register" element={<Register />} />
      <Route path="/downloadPdf" element={<DownloadPdfActivity />} />
       <Route path="*" element={<Home />}  />
    </Routes>

 
    </div>
    </UserState>
    </StudentState>
    </>
  );
}

export default App;
