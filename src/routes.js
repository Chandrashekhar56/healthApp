import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { useEffect } from 'react';
import { Container } from '@mui/system';
import { DashboardLayout } from './layouts/dashboard';
import { SimpleLayout } from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Account from './pages/Account/Account';
import SignUp from './pages/SignUp';
import ResetPasswordPage from './pages/RessetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Bookings from './pages/Booking';
import BookingSettingContainer from './pages/BookingSetting';
import WaitingRoom from './pages/VideoCall';
import PatientList from './pages/Patient';
import Invoice from './pages/Invoice';
import Message from './pages/Message';
import Fax from './pages/Fax';
// import DashboardAppPage from './pages/DashboardAppPage';
// import Forms from './pages/Forms';
// import Payment from './pages/Payment';
// import AppointmentHistory from './pages/AppointmentHistory';
// import BookingForm from './pages/Booking/BookingForm';
// import BookingSlots from './pages/Booking/BookingSlots';
// import AddClinic from './pages/admin/AddClinic';
// import Teams from './pages/Team';
// import AddTeamMember from './pages/Team/AddTeamMember';
// import MasterFormPage from './pages/Masters/masterForm';
// import AddPateint from './pages/Patient/AddPatient';

import { UI_ROUTES } from './lib/routeConstants';
import { roleTypes } from './lib/constants';
import BookingPortal from './pages/PatientPortal';
import PatientAppointmentList from './pages/Patient/components/Appointment';
import PatientNotes from './pages/Patient/components/Comments';
import { getUserRole } from './lib/utils';
import Order from './pages/Order';
import Home from './pages/Patient/components/Home/Home';
import Clinic from './pages/Clinic';
import ClinicAdmin from './pages/Clinic/ClinicAdmin';
import GraphTracking from './pages/Patient/components/ActivityLogs/GraphTracking';
import EndCall from './pages/VideoCall/Components/EndCall';
import OpenTalkVideoRoom from './pages/VideoCall/OpenTalk/OpenTalkVideoRoom';
import useAuthUser from './hooks/useAuthUser';
import ChatLists from './pages/Chat';
import EPrescription from './pages/PatientPortal/EPrescription';
import FormHome from './pages/FormBuilder/MyFormsTabs';
import FormTabsShared from './pages/SharedForms/FormTabsShared';
import PatientFormList from './pages/PatientPortal/Forms';
import DashboardHome from './pages/SuperAdminDashboard/DashboardHome';
import Masters from './pages/Masters';
import AppointmentsBoard from './pages/AppointmentsBoard';
import ClinicMedInstructionList from './pages/MedInstrcution';
// ----------------------------------------------------------------------

const allRoute = [
  { path: UI_ROUTES.accounts, element: <Account /> },
  { path: UI_ROUTES.booking, element: <Bookings /> },
  { path: UI_ROUTES.board, element: <AppointmentsBoard /> },
  { path: UI_ROUTES.clinics, element: <Clinic />, isNested: true },
  {
    path: UI_ROUTES.clinic,
    element: <ClinicAdmin />,
    isNested: true,
  },
  { path: UI_ROUTES.masters, element: <Masters /> },
  {
    path: UI_ROUTES.bookingSetting,
    element: <BookingSettingContainer />,
  },
  { path: UI_ROUTES.patient, element: <PatientList />, isNested: true },
  { path: UI_ROUTES.appointments, element: <PatientAppointmentList /> },
  { path: UI_ROUTES.invoice, element: <Invoice /> },
  { path: UI_ROUTES.messages, element: <PatientNotes /> },
  { path: UI_ROUTES.cards, element: <Message /> },
  {
    path: UI_ROUTES.shared,
    element: <PatientFormList shared />,
    isNested: true,
  },
  { path: UI_ROUTES.fax, element: <Fax /> },
  { path: UI_ROUTES.files, element: <Message /> },
  { path: UI_ROUTES.chat, element: <ChatLists />, isNested: true },

  // { path: UI_ROUTES.app, element: <DashboardAppPage /> },
  // { path: UI_ROUTES.bookingSlots, element: <BookingSlots /> },
  // { path: UI_ROUTES.addClinic, element: <AddClinic /> },
  // { path: UI_ROUTES.teams, element: <Teams /> },
  // { path: UI_ROUTES.addTeams, element: <AddTeamMember /> },
  // { path: UI_ROUTES.addPatient, element: <AddPateint /> },
  // { path: UI_ROUTES.addMaster, element: <MasterFormPage /> },
  // { path: UI_ROUTES.editMaster, element: <MasterFormPage /> },
  // { path: UI_ROUTES.forms, element: <Forms /> },
  // { path: UI_ROUTES.messages, element: <Message /> },
  // { path: UI_ROUTES.payment, element: <Payment /> },
  // { path: UI_ROUTES.invoice, element: <Invoice /> },
  // { path: UI_ROUTES.appointments, element: <AppointmentHistory /> },
  // { path: UI_ROUTES.bookingForm, element: <BookingForm /> },
  { path: UI_ROUTES.formBuilder, element: <FormHome /> },
  { path: UI_ROUTES.forms, element: <PatientFormList />, isNested: true },
  { path: UI_ROUTES.order, element: <Order /> },
  { path: UI_ROUTES.patientHome, element: <Home /> },
  { path: UI_ROUTES.graphTracking, element: <GraphTracking /> },
  { path: UI_ROUTES.prescription, element: <EPrescription />, isNested: true },
  { path: UI_ROUTES.sharedForms, element: <FormTabsShared /> },
  { path: UI_ROUTES.adminDashboard, element: <DashboardHome /> },
  { path: UI_ROUTES.medInstruction, element: <ClinicMedInstructionList /> },

  // { path: UI_ROUTES.app, element: <DashboardAppPage /> },
  // { path: UI_ROUTES.bookingSlots, element: <BookingSlots /> },
  // { path: UI_ROUTES.addClinic, element: <AddClinic /> },
  // { path: UI_ROUTES.teams, element: <Teams /> },
  // { path: UI_ROUTES.addTeams, element: <AddTeamMember /> },
  // { path: UI_ROUTES.addPatient, element: <AddPateint /> },
  // { path: UI_ROUTES.addMaster, element: <MasterFormPage /> },
  // { path: UI_ROUTES.editMaster, element: <MasterFormPage /> },
  // { path: UI_ROUTES.forms, element: <Forms /> },
  // { path: UI_ROUTES.messages, element: <Message /> },
  // { path: UI_ROUTES.payment, element: <Payment /> },
  // { path: UI_ROUTES.invoice, element: <Invoice /> },
  // { path: UI_ROUTES.appointments, element: <AppointmentHistory /> },
  // { path: UI_ROUTES.bookingForm, element: <BookingForm /> },
];

export const superAdminRoutes = [
  UI_ROUTES.accounts,
  UI_ROUTES.bookingSetting,
  UI_ROUTES.clinics,
  UI_ROUTES.adminDashboard,
];
export const clinicAdminRoutes = [
  UI_ROUTES.accounts,
  UI_ROUTES.bookingSetting,
  UI_ROUTES.clinic,
  UI_ROUTES.booking,
  UI_ROUTES.patient,
  UI_ROUTES.masters,
  UI_ROUTES.fax,
  UI_ROUTES.formBuilder,
  UI_ROUTES.order,
  UI_ROUTES.chat,
  UI_ROUTES.sharedForms,
  UI_ROUTES.graphTracking,
  UI_ROUTES.board,
  UI_ROUTES.medInstruction,
  UI_ROUTES.adminDashboard,
];

export const assistantRoutes = [
  UI_ROUTES.accounts,
  UI_ROUTES.bookingSetting,
  UI_ROUTES.clinic,
  UI_ROUTES.booking,
  UI_ROUTES.patient,
  UI_ROUTES.masters,
  UI_ROUTES.fax,
  UI_ROUTES.formBuilder,
  UI_ROUTES.order,
  UI_ROUTES.chat,
  UI_ROUTES.sharedForms,
  UI_ROUTES.graphTracking,
  UI_ROUTES.board,
  UI_ROUTES.medInstruction,
];

export const practitionerRoutes = [
  UI_ROUTES.accounts,
  UI_ROUTES.bookingSetting,
  UI_ROUTES.clinic,
  UI_ROUTES.booking,
  UI_ROUTES.patient,
  UI_ROUTES.masters,
  UI_ROUTES.fax,
  UI_ROUTES.formBuilder,
  UI_ROUTES.order,
  UI_ROUTES.chat,
  UI_ROUTES.sharedForms,
  UI_ROUTES.graphTracking,
  UI_ROUTES.board,
  UI_ROUTES.medInstruction,
];

export const patientRoutes = [
  UI_ROUTES.appointments,
  UI_ROUTES.patientHome,
  UI_ROUTES.accounts,
  UI_ROUTES.messages,
  UI_ROUTES.cards,
  UI_ROUTES.invoice,
  UI_ROUTES.files,
  UI_ROUTES.shared,
  UI_ROUTES.forms,
  UI_ROUTES.chat,
  UI_ROUTES.graphTracking,
  UI_ROUTES.prescription,
];

export const getInitialRoute = (role) => {
  if (role === roleTypes.superAdmin) return UI_ROUTES.adminDashboard;
  if (role === roleTypes.patient) return patientRoutes[0];

  return UI_ROUTES.booking;
};

const getAllowedRoute = (role) => {
  let routes;
  if (role === roleTypes.superAdmin)
    routes = allRoute.filter((route) => superAdminRoutes.includes(route?.path));
  else if (role === roleTypes.patient)
    routes = allRoute.filter((route) => patientRoutes.includes(route?.path));
  else if (role === roleTypes.clinicAdmin)
    routes = allRoute.filter((route) =>
      clinicAdminRoutes.includes(route?.path)
    );
  else if (role === roleTypes.practitioner)
    routes = allRoute.filter((route) =>
      practitionerRoutes.includes(route?.path)
    );
  else
    routes = allRoute.filter((route) => assistantRoutes.includes(route?.path));

  return routes?.map((route) => ({
    path: route.isNested ? `${route.path}/*` : route.path,
    element: route.element,
  }));
};

export default function Router() {
  const userRole = getUserRole();
  const routes = useRoutes([
    {
      path: UI_ROUTES.dashboard,
      element: <DashboardLayout />,
      children: [
        {
          element: <Navigate to={getInitialRoute(userRole)} />,
          index: true,
        },
        ...getAllowedRoute(userRole),
      ],
    },
    { path: UI_ROUTES.joinRoom, element: <OpenTalkVideoRoom /> },
    { path: UI_ROUTES.waitingroom, element: <WaitingRoom /> },
    { path: UI_ROUTES.endVideoCall, element: <EndCall /> },
    {
      path: UI_ROUTES.login,
      element: <LoginPage />,
    },
    {
      path: UI_ROUTES.signup,
      element: <SignUp />,
    },
    {
      path: UI_ROUTES.resetpassword,
      element: <ResetPasswordPage />,
    },
    {
      path: UI_ROUTES.forgotpassword,
      element: <ForgotPasswordPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to={UI_ROUTES.dashboard} />, index: true },
        { path: UI_ROUTES.NOTFound, element: <Page404 /> },
        // { path: '*', element: <Navigate to={UI_ROUTES.NOTFound} /> },
      ],
    },
    {
      path: UI_ROUTES.bookings,
      element: <BookingPortal />,
    },
    {
      path: '*',
      element: <NotFoundHandler />,
    },
  ]);

  return routes;
}

const NotFoundHandler = () => {
  const [user, , , , , validateToken] = useAuthUser();

  useEffect(() => {
    validateToken();
  }, []);

  if (user) {
    return <Navigate to={UI_ROUTES.NOTFound} />;
  }

  return <Container loading />;
};
