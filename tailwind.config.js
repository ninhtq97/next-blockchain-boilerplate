const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    '**/components/**/*.{js,ts,jsx,tsx}',
    '**/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
      container: {
        center: true,
        screens: {},
        padding: {
          DEFAULT: '1rem',
        },
      },
      display: {
        none: 'none',
        block: 'block',
        table: 'table',
        flex: 'flex',
        grid: 'grid',
      },
      position: {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
        center: 'center',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          '&:not(.fluid)': {
            '@screen sm': {
              maxWidth: '540px',
            },
            '@screen md': {
              maxWidth: '720px',
            },
            '@screen lg': {
              maxWidth: '960px',
            },
            '@screen xl': {
              maxWidth: '1140px',
            },
            '@screen 2xl': {
              maxWidth: '1352px',
            },
          },
        },

        '.modal': {
          position: 'fixed',
          inset: `${theme('translate.0')} ${theme('translate.0')}`,
          overflow: 'auto',
          zIndex: '1000',

          '&__overlay': {
            display: theme('display.flex'),
            alignItems: theme('position.center'),
            justifyContent: theme('position.center'),
            minHeight: theme('height.full'),
            background: 'rgba(5,5,27,.6)',
            padding: `0 ${theme('spacing.3')}`,
          },

          '&__container': {
            position: 'relative',
            margin: `${theme('spacing.8')} auto`,
            width: theme('width.full'),
            backgroundColor: theme('colors.white'),
            borderRadius: theme('borderRadius.lg'),
            padding: theme('spacing.5'),
          },

          '&__close': {
            position: 'absolute',
            top: theme('translate.0'),
            right: theme('translate.0'),
            color: '#FD6585',
            zIndex: 1,
          },

          '&__header': {
            position: 'relative',
          },

          '&__content': {
            position: 'relative',
          },

          '&__footer': {
            position: 'relative',
          },
        },

        '.tbl-wrapper': {
          position: 'relative',
          overflowX: 'auto',
          width: theme('width.full'),
        },

        'table.tbl': {
          width: theme('width.full'),

          'th, td': {
            whiteSpace: 'nowrap',
          },

          thead: {
            tr: {
              fontWeight: theme('fontWeight.semibold'),
              fontSize: '15px',
              lineHeight: theme('lineHeight.5'),

              th: {
                padding: `${theme('spacing.0')} ${theme('spacing.0')} 5px`,
                color: theme('colors.white'),
              },
            },
          },

          tbody: {
            tr: {
              position: 'relative',
              transition: '.5s',
              zIndex: 0,
            },
          },

          td: {
            color: theme('colors.white'),
          },
        },

        '.pagination': {
          position: 'relative',
          display: theme('display.flex'),
          alignItems: theme('position.center'),
          justifyContent: theme('position.center'),
          flexWrap: 'wrap',
          gap: theme('spacing.3'),
          color: theme('colors.white'),
          zIndex: 1,

          '@screen sm': {
            justifyContent: 'space-between',
          },

          '&.simple': {
            '.pagination': {
              '&__container': {
                justifyContent: theme('position.center'),

                '@screen sm': {
                  justifyContent: 'center',
                  flex: 'auto',
                },
              },
            },
          },

          '&__size': {},

          '&__container': {
            display: theme('display.flex'),
            alignItems: theme('position.center'),
            justifyContent: theme('position.center'),
            flexWrap: 'wrap',
            gap: theme('spacing.3'),
            flex: theme('width.full'),

            '@screen sm': {
              justifyContent: 'flex-end',
              flex: 'auto',
            },
          },

          '&__item': {
            position: 'relative',
            display: theme('display.flex'),
            alignItems: theme('position.center'),
            justifyContent: theme('position.center'),
            width: theme('width.8'),
            height: theme('height.8'),
            fontSize: theme('fontSize.sm'),
            lineHeight: theme('lineHeight.4'),
            borderRadius: theme('borderRadius.full'),
            transition: theme('transitionDuration.200'),
            overflow: 'hidden',
            zIndex: theme('zIndex.0'),

            '&:not(&--active)': {
              cursor: theme('cursor.pointer'),
              pointerEvents: 'auto',

              '&:hover': {
                color: theme('colors.white'),
              },
            },

            '&--active': {
              cursor: theme('cursor.default'),
              pointerEvents: 'none',
              color: theme('colors.black.600'),
            },
          },
        },

        '.select': {
          position: 'relative',
          display: theme('display.flex'),
          flexDirection: 'column',
          gap: theme('spacing.1'),
          width: theme('width.full'),
          userSelect: 'none',
          cursor: theme('cursor.pointer'),

          '&__value-container': {
            display: theme('display.flex'),
            alignItems: theme('position.center'),
            justifyContent: theme('position.center'),
            gap: '6px',
            border: `1px solid`,
            borderRadius: theme('borderRadius.lg'),
            padding: `7px ${theme('spacing.4')}`,
            minHeight: theme('height.10'),
            background: theme('colors.white'),
            transition: '.5s',
          },

          '&__dropdown': {
            display: theme('display.flex'),
            flexDirection: 'column',
            gap: theme('spacing.3'),

            '.options': {
              display: theme('display.flex'),
              flexDirection: 'column',
              color: theme('colors.gray.500'),
              maxHeight: theme('height.52'),
              overflow: 'auto',
            },

            '.option': {
              fontFamily: theme('fontFamily.texta-pro'),
              fontWeight: theme('fontWeight.medium'),
              fontSize: theme('fontSize.base'),
              lineHeight: theme('lineHeight.6'),
              padding: `${theme('spacing.1')} ${theme('spacing.2')}`,
              borderRadius: theme('borderRadius'),
              cursor: theme('cursor.pointer'),
              transition: '.5s',
              backgroundColor: theme('colors.white'),

              '&:hover': {
                backgroundColor: `rgba(0,0,0,.05)`,
                color: theme('colors.blue.700'),
              },

              '&__value': {
                fontFamily: theme('fontFamily.texta-pro'),
                fontWeight: theme('fontWeight.medium'),
                fontSize: theme('fontSize.base'),
                lineHeight: theme('lineHeight.6'),
                color: theme('colors.black.600'),
              },
            },
          },
        },

        '.ipt': {
          width: theme('width.full'),
          whiteSpace: 'nowrap',
        },

        '.text-field': {
          display: theme('display.flex'),
          alignItems: theme('position.center'),
          gap: theme('gap.4'),
          padding: `9px ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.lg'),
          backgroundColor: theme('colors.white'),
          color: theme('colors.blue.700'),

          '.ipt': {
            fontSize: theme('fontSize.base'),
            fontWeight: theme('fontWeight.sm'),
            lineHeight: theme('lineHeight.5'),
            border: 'none',
            backgroundColor: theme('colors.transparent'),
            outline: 'none',
            color: 'currentColor',
            textAlign: 'inherit',

            '&::placehoder': {
              color: theme('colors.gray.500'),
            },
          },
        },

        '.range': {
          '[type="range"]': {
            appearance: 'none',
            borderRadius: theme('borderRadius.DEFAULT'),

            '&::-webkit-slider-thumb': {
              appearance: 'none',
              width: '10px',
              height: '10px',
              marginTop: `-1.55px`,
              backgroundColor: theme('colors.orange.400'),
              border: 0,
              borderRadius: theme('borderRadius.full'),
              boxShadow: `0 0 0 5px rgba(255, 255, 255, 0.1)`,
            },

            '&::-webkit-slider-runnable-track': {
              appearance: 'none',
              height: '6px',
              cursor: theme('cursor.pointer'),
            },
          },

          '.bubble': {
            position: 'absolute',
            top: `calc(${theme('translate.full')} + 13.76px)`,
            left: theme('translate.1/2'),
            transform: `translateX(-${theme('translate.1/2')})`,
            padding: `${theme('spacing.[0.5]')} ${theme('spacing.2')}`,
            minWidth: theme('width.10'),
            textAlign: theme('position.center'),
            backgroundColor: theme('colors.red.200'),
            borderRadius: theme('borderRadius.md'),
            color: theme('colors.white'),

            '&::before': {
              content: theme('content.DEFAULT'),
              position: 'absolute',
              bottom: theme('translate.full'),
              left: theme('translate.1/2'),
              transform: `translateX(-${theme('translate.1/2')})`,
              borderWidth: '0 8px 5px',
              borderColor: `${theme('backgroundColor.transparent')} ${theme(
                'backgroundColor.transparent',
              )} ${theme('colors.red.200')} ${theme(
                'backgroundColor.transparent',
              )}`,
            },
          },
        },

        '.btn': {
          position: 'relative',
          display: theme('display.flex'),
          alignItems: theme('position.center'),
          justifyContent: theme('position.center'),
          padding: `${theme('spacing.2')} ${theme('spacing.6')}`,
          color: theme('colors.black'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.6'),
          whiteSpace: 'nowrap',
          transition: '.5s',
          zIndex: 0,
          border: `1px solid ${theme('colors.black')}`,
          borderRadius: theme('borderRadius.md'),

          '&:disabled': {
            overflow: 'hidden',
            pointerEvents: 'none',
            boxShadow: 'none',
            borderColor: 'transparent',
            background: 'transparent',

            '&::before': {
              content: theme('content.DEFAULT'),
              position: 'absolute',
              top: theme('translate.0'),
              left: theme('translate.0'),
              width: theme('width.full'),
              height: theme('height.full'),
              zIndex: -2,
              background: theme('colors.gray.400'),
            },
          },
        },
      });
    }),
  ],
};
