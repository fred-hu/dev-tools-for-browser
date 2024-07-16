import Provider from '~app/components/provider';
import App from '~devtools/mock-record/app';
function AppProvider() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

export default AppProvider;
