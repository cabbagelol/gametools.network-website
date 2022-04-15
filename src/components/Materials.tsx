import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const M88 = css`
  --color-text: rgba(255, 255, 255, 0.88);
  --color-alt-text: rgba(255, 255, 255, 0.68);
  --color-base: #151829;
`;

export const M92 = css`
  --color-text: rgba(255, 255, 255, 0.92);
  --color-alt-text: rgba(255, 255, 255, 0.72);
  --color-base: #1e2132;
`;

export const M96 = css`
  --color-text: rgba(255, 255, 255, 0.96);
  --color-alt-text: rgba(255, 255, 255, 0.76);
  --color-base: #282a3a;
  --color-alt-base: #2e313f;
`;
export const M100 = css`
  --color-text: rgba(255, 255, 255, 1);
  --color-alt-text: rgba(255, 255, 255, 0.8);
  --color-base: #313443;
`;

export const AltText = css`
  --color-text: var(--color-alt-text);
`;

export const Column = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin: 0 auto;
  margin-top: 0.5rem;
`;

export const Row = styled.div`
  flex: 1;
`;

export const PageColumn = styled.div`
  @media screen and (min-width: 1800px) {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
  }
`;

export const PageRow = styled.div`
  @media screen and (min-width: 1800px) {
    flex: 0;
    min-width: 800px;
  }
  @media screen and (max-width: 1800px) {
    flex: 100%;
  }
`;

export const Container = styled.div`
  @media (min-width: 850px) {
    padding-left: 8.33%;
  }
  @media (max-width: 850px) {
    padding-left: 2%;
  }
`;

export const Back = styled(Link)`
  ${M88}
  align-items: center;
`;

export const ArrowLeft = styled.i`
  border: solid white;
  border-width: 0 1.8px 1.8px 0;
  margin-right: 5px;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

export const Bf2042SearchBox = styled.input`
  ${M96}
  ::placeholder {
    color: var(--color-alt-text);
  }
  @media (min-width: 710px) {
    width: 20rem;
  }
  @media (max-width: 710px) {
    max-width: 20rem;
    width: 95%;
  }
  box-sizing: border-box;
  color: var(--color-text);
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: #1e2132;
  height: 50px;
  padding-left: 2rem;
  margin-bottom: 1rem;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
`;

export const Bf2042BigSelectSecondary = styled.select`
  ${M96}
  width: 10rem;
  background: #1e2132;
  color: #929292;
  margin-bottom: 1rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  height: 50px;
  margin-right: 1rem;
  padding-left: 18px;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(131,131,131)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 13px;
`;

export const SearchBox = styled.input`
  ${M96}
  ::placeholder {
    color: var(--color-alt-text);
  }
  @media (min-width: 710px) {
    width: 30rem;
  }
  @media (max-width: 710px) {
    max-width: 30rem;
    width: 95%;
  }
  box-sizing: border-box;
  color: var(--color-text);
  border: none;
  border-radius: 5px;
  background: #1e2132;
  height: 50px;
  padding-left: 2rem;
  margin-bottom: 1rem;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const SmallSearchBox = styled.input`
  ${M96}
  ::placeholder {
    color: var(--color-alt-text);
  }
  box-sizing: border-box;
  color: var(--color-text);
  border: none;
  border-radius: 5px;
  background: #1e2132;
  width: 191px;
  height: 30px;
  padding-left: 1rem;
  margin-bottom: 1rem;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const PrimaryButtonLink = styled.a`
  padding: 10px 20px;
  background: var(--color-blue);
  border-radius: 5px;
  transition: all 0.1s;
  //box-sizing: borfer-box;
  display: flex;
  flex-grow: 1;
  width: auto;
  :hover {
    background: var(--color-blue-alt);
  }
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
`;

export const ButtonLink = styled.a`
  ${M96}
  padding: 10px 20px;
  background: var(--color-base);
  border-radius: 5px;
  transition: all 0.1s;
  display: flex;
  flex-grow: 1;
  width: auto;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  :hover {
    background: var(--color-alt-base);
  }
`;

export const BigButtonSecondary = styled.button`
  ${M96}
  background: #1E2132;
  color: var(--color-text);
  border: none;
  margin-bottom: 1rem;
  border-radius: 5px;
  height: 50px;
  width: 134px;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  cursor: pointer;
  :hover {
    background: var(--color-base);
  }
`;

export const SmallButtonSecondary = styled.button`
  ${M96}
  background: #1E2132;
  color: var(--color-text);
  border: none;
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  box-sizing: borfer-box;
  cursor: pointer;
  :hover {
    background: var(--color-base);
  }
`;

export const BigSelectSecondary = styled.select`
  ${M96}
  background: #1E2132;
  color: var(--color-text);
  margin-bottom: 1rem;
  border-radius: 5px;
  border: none;
  height: 50px;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding-left: 18px;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 13px;
`;

export const SelectPrimary = styled.select`
  ${M96}
  background: #1E2132;
  color: var(--color-text);
  border-radius: 5px;
  border: none;
  height: 30px;
  padding: 0 24px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 1rem;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 3px;
`;

export const SelectSecondary = styled.select`
  ${M96}
  background: #1E2132;
  color: var(--color-text);
  border-radius: 5px;
  border: none;
  height: 30px;
  padding: 0 24px;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 3px;
`;

export const Align = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const AlignS = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export const AlignW = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

export const AlignT = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Alignbf2042Search = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const GridContainer = styled.div`
  display: grid;
  @media (min-width: 600px) {
    grid-template-columns: auto auto auto auto auto;
  }
  @media (max-width: 600px) and (min-width: 450px) {
    grid-template-columns: auto auto auto;
  }
  @media (max-width: 450px) {
    grid-template-columns: auto auto;
  }
`;

export function RightArrow(): React.ReactElement {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666504 5.33333V6.66667H8.6665L4.99984 10.3333L5.9465 11.28L11.2265 6L5.9465 0.720001L4.99984 1.66667L8.6665 5.33333H0.666504Z"
        fill="#EBEBEB"
      />
    </svg>
  );
}

const BoxSpacing = styled.div`
  max-width: 45rem;
  margin: 0 12px 18px 0;
`;

const BoxWrap = styled.div`
  ${M92}
  background: var(--color-base);
  align-self: flex-start;
  display: flex;
  box-sizing: border-box;

  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const BoxInner = styled.div`
  flex-grow: 2;
  padding: 12px 24px 24px 24px;
  box-sizing: border-box;
  display: flex;
  overflow-y: auto;
  max-width: 45rem;
  max-height: 30rem;
  flex-direction: column;
  //display: flex;
`;

interface ConLink {
  children: React.ReactElement<unknown, string>;
  to: string;
  condition: boolean;
}

export function Box(props: {
  align?: string;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
  className?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  link?: string;
  condition?: boolean;
}): React.ReactElement {
  const ConditionalLink = ({ children, to, condition }: ConLink) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;

  if (props.condition === undefined) {
    return (
      <BoxSpacing>
        <BoxWrap className={props.className} style={props.style}>
          <BoxInner
            style={{
              alignItems: props.align || "stretch",
              ...props.innerStyle,
            }}
          >
            {props.children}
          </BoxInner>
        </BoxWrap>
      </BoxSpacing>
    );
  }

  return (
    <BoxSpacing>
      <ConditionalLink to={props.link} condition={props.condition}>
        <BoxWrap className={props.className} style={props.style}>
          <BoxInner
            style={{
              alignItems: props.align || "stretch",
              ...props.innerStyle,
            }}
          >
            {props.children}
          </BoxInner>
        </BoxWrap>
      </ConditionalLink>
    </BoxSpacing>
  );
}

export const Circle = styled.span`
  ${M92}
  height: 60px;
  width: 60px;
  margin-right: 1.5rem;
  background-color: var(--color-base);
  border-radius: 50%;
`;

export const InvisableRadioButton = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  position: fixed;
  width: 0;
`;

export const Radio = styled.div`
  // for next-row
  margin-bottom: 1rem;
  height: 35px;
`;

export const SmallButtonRadio = styled.label`
  ${M96}
  background: #1E2132;
  color: var(--color-text);
  border: none;
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
`;

export const UncheckedSmallButtonRadio = styled.label`
  ${M96}
  color: var(--color-text);
  border: none;
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  cursor: pointer;
  :hover {
    background: var(--color-base);
  }
`;

export const SmallestPhoneRow = styled.div`
  flex: 1;
  @media (max-width: 440px) {
    display: none;
  }
`;

export const SmallPhoneRow = styled.div`
  flex: 1;
  @media (max-width: 570px) {
    display: none;
  }
`;

export const TabletRow = styled.div`
  flex: 1;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const PhoneRow = styled.div`
  flex: 1;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const PhoneVis = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
