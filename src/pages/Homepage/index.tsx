import React from "react";
import { MainLayout } from "../../components/main-layout";

const Homepage: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <div className="listTitle">
          <p>List Pokemon</p>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            sint doloremque porro.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Homepage;
