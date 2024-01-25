import { Helmet } from 'react-helmet-async';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import palette from 'src/theme/palette';
import useValidateAuth from 'src/hooks/useValidateAuth';
import useResponsive from '../../hooks/useResponsive';
import TherapyCounselling from '../../assets/images/svg/therapy-counseling.png';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 448,
  maxHeight: 534,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 2),
}));

const AuthContainer = ({ label, component }) => {
  useValidateAuth();
  const mdUp = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title>{label}</title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ mt: 10, fontSize: { md: 40 } }}>
              <Typography
                sx={{ color: palette.primary.main, fontSize: { md: 40 } }}
                display="inline"
                variant="h3"
              >
                Hi
              </Typography>
              , Welcome Back
            </Typography>
            <Box>
              <img
                src={TherapyCounselling}
                alt="login"
                width="415"
                height="415"
              />
            </Box>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography
              sx={{ fontSize: '2rem', fontWeight: '500' }}
              gutterBottom
            >
              {label}
            </Typography>

            {component}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default AuthContainer;
