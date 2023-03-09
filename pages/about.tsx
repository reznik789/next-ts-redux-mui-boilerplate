import React from "react";
import AuthOnlyLayout from "layouts/AuthOnlyLayout";
import { MainLayout } from "layouts/MainLayout";

const About = () => {
  return <h3>About page</h3>;
};

export default About;

About.getLayout = function getLayout(page) {
  return (
    <AuthOnlyLayout>
      <MainLayout>{page}</MainLayout>
    </AuthOnlyLayout>
  );
};
