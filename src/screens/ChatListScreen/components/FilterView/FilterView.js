import strings from '@localization/Localization';
import {TextStyles} from '@styles';
import {Sizes} from '@theme';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChannelRow, ContactRow} from './components';

class FilterView extends Component {
  //
  state = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  onConfirm() {
    const {options} = this.state;
    this.props.onConfirm(options);
  }

  onSelect(item, row) {
    // console.log(row.id);
    const {id, option_type} = item;
    let temp = this.state.options;
    let updated = false;
    switch (option_type) {
      case 'single':
        {
          let index = 0;
          for (const option of temp) {
            let subIndex = 0;
            const {data} = option;
            if (id === option.id) {
              for (const item of data) {
                if (row.id === item.id) {
                  data[subIndex] = {
                    ...item,
                    selected: !item.selected,
                  };
                } else {
                  data[subIndex] = {
                    ...item,
                    selected: false,
                  };
                }
                updated = true;
                subIndex++;
              }
            }
            if (updated) {
              temp[index] = {
                ...option,
                data: data,
              };
              break;
            }
            index++;
          }
        }
        break;
      case 'mutli':
        {
          let index = 0;
          for (const option of temp) {
            let subIndex = 0;
            const {data} = option;
            if (id === option.id) {
              for (const item of data) {
                if (row.id === item.id) {
                  data[subIndex] = {
                    ...item,
                    selected: !item.selected,
                  };
                  updated = true;
                }
                subIndex++;
              }
            }
            index++;
          }
        }
        break;
    }
    if (updated) {
      this.setState({options: temp});
    }
  }

  renderItem({item}) {
    const {type, data} = item;
    switch (type) {
      case 'contact_type':
        return (
          <>
            <View style={styles.separator} />
            <View style={{paddingVertical: Sizes.padding.small}}>
              {data.map(row => {
                return (
                  <ContactRow
                    key={row.id}
                    {...row}
                    onSelect={() => {
                      this.onSelect(item, row);
                    }}
                  />
                );
              })}
            </View>
          </>
        );
      case 'channel':
        return (
          <>
            <View style={styles.separator} />
            <View style={styles.headerContainer}>
              <Text style={styles.rowText}>{strings.channel}</Text>
            </View>
            {data.map(row => {
              return (
                <ChannelRow
                  key={row.id}
                  {...row}
                  onSelect={() => {
                    this.onSelect(item, row);
                  }}
                />
              );
            })}
          </>
        );
    }
  }

  render() {
    const {onCancel} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{strings.filter}</Text>
        </View>
        <FlatList
          data={this.state.options}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={styles.confirmBtn} onPress={this.onConfirm}>
          <Text style={styles.confirmText}>{strings.confirm}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelText}>{strings.cancel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

FilterView.propTypes = {
  options: PropTypes.array.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    paddingVertical: Sizes.padding.normal,
    paddingHorizontal: Sizes.padding.huge,
  },
  headerText: {
    ...TextStyles.roboto.subTitle,
  },
  contactRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Sizes.padding.normal,
    paddingHorizontal: Sizes.padding.normal,
  },
  rowText: {
    ...TextStyles.roboto.label,
    fontSize: 16,
  },
  confirmBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.small,
    marginBottom: Sizes.margin.small,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    alignSelf: 'stretch',
    height: Sizes.btn.height,
    backgroundColor: '#2198FA',
  },
  confirmText: {
    ...TextStyles.roboto.text,
    color: '#FFFFFF',
  },
  cancelBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: Sizes.margin.tiny,
    marginBottom: Sizes.margin.huge,
    marginHorizontal: Sizes.margin.huge,
    padding: Sizes.padding.small,
    borderRadius: Sizes.borderRadius,
    alignSelf: 'stretch',
    height: Sizes.btn.height,
    backgroundColor: '#E8E8E9',
    shadowColor: '#00000029',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
  cancelText: {
    ...TextStyles.roboto.text,
  },
});

export default FilterView;
