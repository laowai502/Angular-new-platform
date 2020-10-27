import * as go from 'gojs';

export const SHAPES: Array<any> = [
    {
        name: 'Basic Flowchart Shapes',
        data: [
            {
                name: 'Rectangle',
                figure: 'Rectangle'
            },
            {
                name: 'RoundedRectangle',
                figure: 'RoundedRectangle'
            },
            {
                name: 'Diamond',
                figure: 'Diamond'
            },
            {
                name: 'c1',
                geometryString: 'F M0 0 L50 0 L50 35 C25 20 25 50 0 35z'
            },
            {
                name: 'c2',
                geometryString: 'F M5 0 L50 0 L45 35 L0 35z'
            },
            {
                name: 'c3',
                geometryString: 'F M5 0 L45 0 C50 17.5 50 17.5 45 35 L5 35 C0 17.5 0 17.5 5 0z'
            },
            {
                name: 'Ellipse',
                figure: 'Ellipse'
            },
            {
                name: 'c4',
                geometryString: 'F M0 0 L50 0 L50 35 L0 35z M5 0 L 5 35 M 45 0 L 45 35'
            },
            {
                name: 'c5',
                geometryString: 'F M0 0 L50 0 S42 17.5 50 35 L0 35 S-8 17.5 0 0z'
            },
            {
                name: 'c6',
                geometryString: 'F M50 5 L50 35 S25 40 0 35 L0 5 C25 0 25 0 50 5 C25 10 25 10 0 5'
            },
            {
                name: 'c7',
                geometryString: 'F M45 0 L0 0 S-5 17.5 0 35 L45 35 C50 17.5 50 17.5 45 0 C40 17.5 40 17.5 45 35'
            },
            {
                name: 'c8',
                geometryString: 'F M0 0 L50 0 L50 35 L0 35z M5 0 L5 35 M0 5 L50 5'
            },
            {
                name: 'c9',
                geometryString: 'F M0 10 L50 0 L50 35 L0 35z'
            },
            {
                name: 'c10',
                geometryString: 'F M0 10 L10 0 L50 0 L50 35 L0 35z'
            },
            {
                name: 'c11',
                geometryString: 'F M8 0 L42 0 L50 35 L0 35z'
            },
            {
                name: 'c12',
                geometryString: 'F M0 8 L8 0 L42 0 L50 8 L50 35 L0 35z'
            },
            {
                name: 'c13',
                geometryString: 'F M0 0 C25 20 25 -20 50 0 L50 35 C25 15 25 55 0 35z'
            },
            {
                name: 'c14',
                geometryString: 'F M0 0 L40 0 S70 17.5 40 35 L0 35z'
            },
            {
                name: 'c15',
                geometryString: 'F M10 0 L40 0 L50 17.5 L40 35 L10 35 L0 17.5z'
            },
            {
                name: 'c16',
                geometryString: 'F M0 0 L30 0 L50 17.5 L30 35 L0 35z',
            },
            {
                name: 'star',
                geometryString: 'F M17.5 0 L23 12.3 L35 12.3 L27 20 L30 35 L17.5 24.6 L5 35 L8 20 L0 12.3 L12 12.3z',
                width: 35,
                height: 35,
                margin: new go.Margin(8, 0, 0, 5)
            },
            {
                name: 'Square',
                figure: 'Square',
                width: 35,
                margin: new go.Margin(10, 0, 0, 5)
            },
            {
                name: 'Circle',
                figure: 'Circle',
                margin: new go.Margin(10, 0, 0, 5)
            },
            {
                name: 'Triangle',
                figure: 'Triangle',
                width: 40
            },
            {
                name: 'c18',
                geometryString: 'F M0 0 L80 0 B-90 90 80 20 20 20 L100 100 20 100 B90 90 20 80 20 20z',
            },
            {
                name: 'c19',
                // geometryString: 'F M0 0 L25 0 L35 10 L35 35 L10 35 L0 25 L25 25 L35 35 M25 25 L25 0 M0 25 L0 0',
                geometryString: 'F M0 35 L25 35 L35 25 L35 0 L10 0 L0 10 L25 10 L35 0 M25 10 L25 35 M0 10 L0 35',
                width: 35,
                height: 35,
                margin: new go.Margin(10, 0, 0, 5)
            },
            {
                name: 'user',
                geometryString: 'F M13 0 B0 360 5 0 8 8 M-2 4 S-8 4 -8 8 L-8 23 S-8 26 -6 26 L12 26 S18 26 18 23 L18 8 S18 4 12 4',
                width: 26,
                height: 35,
                margin: new go.Margin(8, 0, 0, 8)
            }
        ]
    },
    {
        name: 'Flow Charts',
        data: [
            // {
            //     name: 'c19',
            //     // geometryString: 'F M0 0 L25 0 L35 10 L35 35 L10 35 L0 25 L25 25 L35 35 M25 25 L25 0 M0 25 L0 0',
            //     geometryString: 'F M0 35 L25 35 L35 25 L35 0 L10 0 L0 10 L25 10 L35 0 M25 10 L25 35 M0 10 L0 35',
            //     width: 35,
            //     height: 35,
            //     margin: new go.Margin(10, 0, 0, 5)
            // }
        ]
    },
    {
        name: 'Arrows',
        data: [
            // {
            //     name: 'c19',
            //     // geometryString: 'F M0 0 L25 0 L35 10 L35 35 L10 35 L0 25 L25 25 L35 35 M25 25 L25 0 M0 25 L0 0',
            //     geometryString: 'F M0 35 L25 35 L35 25 L35 0 L10 0 L0 10 L25 10 L35 0 M25 10 L25 35 M0 10 L0 35',
            //     width: 35,
            //     height: 35,
            //     margin: new go.Margin(10, 0, 0, 5)
            // }
        ]
    },
    {
        name: 'BMPN',
        data: [
            // {
            //     name: 'c19',
            //     // geometryString: 'F M0 0 L25 0 L35 10 L35 35 L10 35 L0 25 L25 25 L35 35 M25 25 L25 0 M0 25 L0 0',
            //     geometryString: 'F M0 35 L25 35 L35 25 L35 0 L10 0 L0 10 L25 10 L35 0 M25 10 L25 35 M0 10 L0 35',
            //     width: 35,
            //     height: 35,
            //     margin: new go.Margin(10, 0, 0, 5)
            // }
        ]
    }
];

