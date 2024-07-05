/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface IProps {
  children?: React.ReactElement;
  name?: string;
  description?: string;
}
/**
 * MainTag组件
 * @param {children} React.ReactElement - 子元素
 * @returns React.ReactElement
 */
export default function MainTag(props: IProps): React.ReactElement {
  const { name, description } = props;
  const innerStyle = css`
    width: 150px;
    background: #fff480;
    color: black;
    position: relative;
    border-radius: 2.5em;
    padding: 2em;
    transition: transform 0.4s ease;
    :hover {
      cursor: pointer;
    }
    .card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 5em;
      height: 100%;
      transition: transform 0.4s ease;
    }

    .card-top,
    .card-bottom {
      display: flex;
      justify-content: space-between;
    }

    .card-top p,
    .card-top .card-title,
    .card-bottom p,
    .card-bottom .card-title {
      margin: 0;
    }

    .card-title {
      font-weight: bold;
    }

    .card-top p,
    .card-bottom p {
      font-weight: 600;
    }

    .card-bottom {
      align-items: flex-end;
    }

    .card-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .card-image svg {
      width: 4em;
      height: 4em;
      transition: transform 0.4s ease;
    }

    .card:hover {
      cursor: pointer;
      transform: scale(0.97);
    }

    .card:hover .card-content {
      transform: scale(0.96);
    }

    .card:hover .card-image svg {
      transform: scale(1.05);
    }

    .card:active {
      transform: scale(0.9);
    }
  `;
  return (
    <div className="card" css={innerStyle}>
      <div className="card-content">
        <div className="card-top">
          <span className="card-title">01.</span>
          <p>{name || 'Hover Me?'}</p>
        </div>
        <div className="card-bottom">
          <p>{description || 'Hover Me?'}</p>
          <svg width="32" viewBox="0 -960 960 960" height="32" xmlns="http://www.w3.org/2000/svg">
            <path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z" />
          </svg>
        </div>
      </div>
      <div className="card-image">
        <svg width="48" viewBox="0 -960 960 960" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="m393-165 279-335H492l36-286-253 366h154l-36 255Zm-73 85 40-280H160l360-520h80l-40 320h240L400-80h-80Zm153-395Z" />
        </svg>
      </div>
    </div>
  );
}
