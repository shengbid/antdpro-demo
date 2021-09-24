import React from 'react'
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
} // Usage of DebounceSelect

async function fetchUserList(username) {
  // console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
        phone: user.phone,
        email: user.email
      })),
    );
}

interface demoprops {
  value?: any
  onChange?: (val?: any, options?: any) => void
}

const Demo = ({val, onChange = () => {}}: demoprops) => {
  const [value, setValue] = React.useState<any>(val || {});

  return (
    <DebounceSelect
      // mode="multiple"
      value={value}
      placeholder="输入名称选择"
      fetchOptions={fetchUserList}
      onChange={(newValue: string, options: any) => {
        setValue(newValue);
        onChange(newValue, options)
      }}
      style={{
        width: '100%',
      }}
    />
  );
};

export default Demo