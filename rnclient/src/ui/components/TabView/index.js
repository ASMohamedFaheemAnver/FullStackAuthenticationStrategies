import {PropTypes} from '@constants/imports';
import {useTheme} from '@theme';
import {TypographyStyles} from '@typography';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';

const TabView = props => {
  const {sceneMap} = props;
  const {colors} = useTheme();
  return (
    <Tabs.Container
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          tabStyle={{backgroundColor: colors.card2}}
          labelStyle={[TypographyStyles.headline, {color: colors.text}]}
          activeColor={colors.primaryDark}
          inactiveColor={colors.text}
        />
      )}
      lazy={false}
      pagerProps={{scrollEnabled: false}}>
      {sceneMap.map(scene => {
        return (
          <Tabs.Tab key={scene.name} name={scene.label} label={scene.label}>
            <Tabs.ScrollView nestedScrollEnabled>
              {scene.component}
            </Tabs.ScrollView>
          </Tabs.Tab>
        );
      })}
    </Tabs.Container>
  );
};

TabView.propTypes = {
  sceneMap: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default TabView;
