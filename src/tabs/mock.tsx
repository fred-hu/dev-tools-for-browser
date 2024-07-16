import Provider from '~app/components/provider';
import App from '~tabs/apps/mock';
function AppProvider() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

export default AppProvider;
