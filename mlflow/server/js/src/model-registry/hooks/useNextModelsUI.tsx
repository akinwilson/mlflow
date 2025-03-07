import React, { useContext, useEffect, useMemo, useState, FC, ComponentType } from 'react';
import { shouldShowModelsNextUI } from '../../common/utils/FeatureUtils';
import { injectIntl, WithIntlProps, IntlShape } from 'react-intl';

const useOldModelsUIStorageKey = '_mlflow_user_setting_dismiss_next_model_registry_ui';

const NextModelsUIContext = React.createContext<{
  usingNextModelsUI: boolean;
  setUsingNextModelsUI: (newValue: boolean) => void;
}>({
  usingNextModelsUI: shouldShowModelsNextUI(),
  setUsingNextModelsUI: () => {},
});

export const useNextModelsUIContext = () => useContext(NextModelsUIContext);

export const withNextModelsUIContext =
  <BaseProps extends { usingNextModelsUI?: boolean }>(
    Component: React.ComponentType<BaseProps>,
  ) =>
  (props: Omit<BaseProps, 'usingNextModelsUI'>) => {
    const [usingNextModelsUI, setUsingNextModelsUI] = useState(
      localStorage.getItem(useOldModelsUIStorageKey) !== 'true',
    );

    useEffect(() => {
      localStorage.setItem(useOldModelsUIStorageKey, (!usingNextModelsUI).toString());
    }, [usingNextModelsUI]);

    const contextValue = useMemo(() => ({ usingNextModelsUI, setUsingNextModelsUI }), [usingNextModelsUI]);

    if (!shouldShowModelsNextUI()) {
      return <Component {...(props as BaseProps)} usingNextModelsUI={false} />;
    }

    return (
      <NextModelsUIContext.Provider value={contextValue}>
        <Component {...(props as BaseProps)} usingNextModelsUI={contextValue.usingNextModelsUI} />
      </NextModelsUIContext.Provider>
    );
  };

type ModelListViewImplProps = {
  models: any[];
  endpoints?: any;
  showEditPermissionModal: (...args: any[]) => any;
  permissionLevel: string;
  selectedOwnerFilter: string;
  selectedStatusFilter: string;
  onOwnerFilterChange: (...args: any[]) => any;
  onStatusFilterChange: (...args: any[]) => any;
  searchInput: string;
  orderByKey: string;
  orderByAsc: boolean;
  currentPage: number;
  nextPageToken: string | null;
  loading?: boolean;
  error?: Error;
  onSearch: (...args: any[]) => any;
  onClickNext: (...args: any[]) => any;
  onClickPrev: (...args: any[]) => any;
  onClickSortableColumn: (...args: any[]) => any;
  onSetMaxResult: (...args: any[]) => any;
  maxResultValue: number;
  intl: IntlShape;
};

// Create a pure component without type information
const ModelListViewImpl = (props: any) => {
    return (
        <div>ModelListViewImpl</div>
    )
};

// Apply injectIntl and then type the result
const IntledComponent = injectIntl<'intl', ModelListViewImplProps>(ModelListViewImpl);

// Now apply withNextModelsUIContext and type the result

// @ts-expect-error
const WrappedComponent = withNextModelsUIContext(IntledComponent) as FC<{ usingNextModelsUI?: boolean }>;

export const ModelListView: FC<{ usingNextModelsUI?: boolean }> = WrappedComponent;

const styles = {
  nameSearchBox: {},
};