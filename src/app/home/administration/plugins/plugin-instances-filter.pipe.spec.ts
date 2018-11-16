import {PluginInstancesFilterPipe} from './plugin-instances-filter.pipe';
import {PluginInstance, PluginInstances} from '../../../core/models/pluginInstances';
import {PluginCategory} from '../../../core/models/available-plugin';

describe('PluginInstancesFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new PluginInstancesFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty list when invalid parameters', () => {
    const pipe = new PluginInstancesFilterPipe();
    expect(pipe.transform(null, null)).toEqual([]);
    expect(pipe.transform(null, 'someText')).toEqual([]);
  });

  it('should return original list when no search text', () => {
    const pipe = new PluginInstancesFilterPipe();
    const instances: PluginInstances = {
      plugins: [
        {
          Id: 1,
          DisplayName: 'System',
          Type: 'System',
          Configuration: null,
          AutoStart: true,
          Category: PluginCategory.System
        },
        {
          Id: 2,
          DisplayName: 'My fakePlugin instance',
          Type: 'dev-fakePlugin',
          Configuration: {
            StringParameter: '',
            BoolParameter: 'false',
            IntParameter: 258,
            DecimalParameter: 25.3,
            EnumParameter: 'EnumValue2',
            MySection: {
              content: {
                SubIntParameter: 65535,
                SubStringParameter: ''
              }
            },
            ConditionalParameter: ''
          },
          AutoStart: true,
          Category: PluginCategory.User
        }
      ]
    };

    expect(pipe.transform(instances.plugins, null)).toEqual(instances.plugins);
    expect(pipe.transform(instances.plugins, '')).toEqual(instances.plugins);
  });

  it('should search on DisplayName', () => {
    const pipe = new PluginInstancesFilterPipe();
    const firstInstance: PluginInstance = {
      Id: 1,
      DisplayName: 'System',
      Type: 'System',
      Configuration: null,
      AutoStart: true,
      Category: PluginCategory.System
    };
    const secondInstance: PluginInstance = {
      Id: 2,
      DisplayName: 'My fakePlugin instance',
      Type: 'dev-fakePlugin',
      Configuration: {
        StringParameter: '',
        BoolParameter: 'false',
        IntParameter: 258,
        DecimalParameter: 25.3,
        EnumParameter: 'EnumValue2',
        MySection: {
          content: {
            SubIntParameter: 65535,
            SubStringParameter: ''
          }
        },
        ConditionalParameter: ''
      },
      AutoStart: true,
      Category: PluginCategory.User
    };
    const instances: PluginInstances = {
      plugins: [firstInstance, secondInstance]
    };

    expect(pipe.transform(instances.plugins, 'ste')).toEqual([firstInstance]);
    expect(pipe.transform(instances.plugins, 'fakePlugin')).toEqual([secondInstance]);
    expect(pipe.transform(instances.plugins, 'e')).toEqual([firstInstance, secondInstance]);
    expect(pipe.transform(instances.plugins, 'notfound')).toEqual([]);
  });
});
