import React, { useContext } from "react";

// import { AuthAppService } from "@/domain/application_service/auth_app_service";
// import { AuthRepository } from "@/infrastructure/repository/auth_repository";

import { AuthContext } from "@/common/contexts/AuthContext";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  // const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  // const [currentUser, setCurrentUser] = useState<User | undefined>();
  // const repository = new AuthRepository();
  // const appService = new AuthAppService(repository);

  // const fetchUser = async () => {
  //   try {
  //     const response = await appService.getCurrentUser();
  //     console.log("Homeユーザデータ取得");
  //     console.log(response);
  //   } catch (err) {
  //     console.log("Homeユーザデータ取得-例外発生");
  //     console.log(err);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isSignedIn && authState.currentUser ? (
        <>
          <h1>Signed in successfully!</h1>
          <h2>Email: {authState.currentUser?.email}</h2>
          <h2>Name: {authState.currentUser?.name}</h2>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
};

export default Home;
