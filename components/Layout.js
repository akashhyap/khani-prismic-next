import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({
  navigation,
  settings,
  withHeaderDivider,
  withProfile,
  children,
  footer
}) => {
 
  return (
    <div className="text-slate-700 bg-[#f7f7f4]">
      <Header
        withProfile={withProfile}
        withDivider={withHeaderDivider}
        navigation={navigation}
        settings={settings}
      />
      <main>{children}</main>
      <Footer footer={footer} navigation={navigation} />
    </div>
  );
};
