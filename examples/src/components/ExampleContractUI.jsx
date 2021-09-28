import { useState, useEffect } from 'react';
import etherGUI, { ContractInteractor, ContractMethod } from 'ether-gui';

import SemanticUIStyledMethod from './StyledComponents/SemanticUIStyledMethod';
import MaterialUIStyledMethod from './StyledComponents/MaterialUIStyledMethod';

const customThemePreferences = {
    wording: {
        true: 'Yep !',
        false: 'Nope !',
        submit: 'Submit Transaction',
        // type values
        string: 'String',
        bool: 'Boolean',
        // field names and method titles can be customized this way too
        isCovidGoneYet: 'IS COVID GONE YET ?'
    },
    styles: {
        label: { color: '#0076ff', textTransform: 'uppercase' },
        header: { color: 'black', textTransform: 'uppercase' },
        button: { textTransform: 'uppercase' },
        subcontainer: { border: 'none', marginBottom: 0, paddingBottom: 0, paddingTop: 0 }
    }
}

const themes = [
    { name: 'material', label: 'Material UI', component: MaterialUIStyledMethod, preferences: { wording: {}, styles: {} } },
    { name: 'semantic', label: 'Semantic UI', component: SemanticUIStyledMethod, preferences: { wording: {}, styles: {} } },
    { name: 'custom', label: 'Custom Wording & Style', component: ContractMethod, preferences: customThemePreferences },
    { name: 'default', label: 'Default', component: ContractMethod, preferences: { wording: {}, styles: {} } },
];

/* Generates UI for ExampleContract, default + 3 customization examples */
const ExampleContractUI = ({ contract }) => {
    const [theme, setTheme] = useState(themes[0]);

    useEffect(() => {
        etherGUI.config.setPreferences(theme.preferences);
    }, [theme]);

    const StyledContractMethod = theme.component;

    const themeLinks = themes.map((t, i) => {
        return <a key={i} href={`#${t.name}`} className={theme.name === t.name ? 'active-theme' : ''} onClick={() => setTheme(t)}>{t.label}</a>
    })

    return (
        <div>
            <h3>Easily customize appearance, themed examples :</h3>
            <div className="App-themes">
                {themeLinks}
            </div>

            <hr />

            <h4>"ExampleContract" methods :</h4>

            <StyledContractMethod
                // Display "title()" Method from contract, customized ResultComponent to add bold
                contract={contract}
                methodSignature="title()"
                ResultComponent={({ children }) => <b>{children}</b>}
            />

            <ContractInteractor
                // ContractInteractor will display all contract's methods by default
                contract={contract}

                // -- Customized Component to use for contract methods
                ContractMethodComponent={StyledContractMethod}

                // -- specify a list of methods to show, order matters (by defaults all are shown)
                // methods={['balances(address)']}

                // -- exclude some methods
                excludeMethods={[
                    'title()',
                    'getNumberList()',
                    'getDuo()',
                    'setDuo(string,string)',
                    'setDuoViaArray(string[2])',
                ]}

                // -- places readOnly methods first (true by default), otherwise alphabetical order only
                // readOnlyFirst={true}

                // -- specific options for specific methods
                methodsOptions={{
                    // exact method signature
                    'addPost((string,(string,string)))': {
                        // options for that method signature
                        title: 'Add a Post',
                        beforeFields: <p>This method takes a <b>Post</b> object as argument</p>,
                        fieldsOptions: {
                            'post': { label: 'Post :' },
                            // object sub-fields options are with the "dot" notation
                            'post.username': {
                                required: true,
                                placeholder: 'Vitalik',
                                label: 'Username',
                            },
                            'post.message': {
                                label: 'Message :',
                            },
                            'post.message.title': {
                                required: true,
                                label: 'Title',
                            },
                            'post.message.content': {
                                required: true,
                                label: 'Content',
                            },
                        }
                    },
                    'posts(uint256)': {
                        beforeFields: <p>This is a public variable of type Post[]</p>,
                        afterFields: <p>"input_0" is the name automatically generated for the "index" parameter</p>,
                        fieldsOptions: { input_0: { placeholder: 'Index of Existing Post, example : 0' } }
                    },
                    'depositAmount()': {
                        beforeFields: <p>This is a <b>payable</b> method, allowing to send Eth to the Contract</p>
                    },
                    'setDuoViaArray(string[2])': {
                        beforeFields: <p>This method takes an array of 2 string as argument</p>
                    },
                    'setNumberList(uint256[])': {
                        beforeFields: <p>This method takes a list of numbers (seperated by commas) as argument</p>,
                        // options for the fields/inputs
                        fieldsOptions: {
                            // options for the "_numberList" field/input
                            _numberList: { placeholder: '1,2,3' }
                        }
                    },
                    'setTitle(string)': {
                        // Will prefill field/inputs by calling a read method from the contract
                        initialStateGetters: {
                            // => by default "setTitle(string)" will get the current title() value to prefill the "title" argument
                            _title: 'title()',
                        }
                    },
                    'balances(address)': {
                        title: 'Custom title for "balances(address)" method',
                        ethFields: ['output_0'],
                        btnLabel: 'Check balance in this contract',
                        fieldsOptions: {
                            input_0: {
                                label: 'Custom label for input_0',
                                required: true,
                            },
                            // options for the output, works the same as field/input options
                            output_0: {
                                label: "User's balance in contract : ",
                            }
                        },
                        // Prefill fields/inputs with some values
                        // initialState: {
                        //   input_0: 'some_address_to_use_as_default'
                        // },
                    },
                    'withdrawAmount(uint256)': {
                        ethFields: ['amount'],
                    },
                }}

            // -- default methodsOptions={}
            // defaultMethodOptions={{
            //   useSignerAddressAsDefault: true,
            // }}
            />
        </div>
    )
}

export default ExampleContractUI;