import React, { PureComponent } from "react";
import { Treemap, ResponsiveContainer } from "recharts";
import axios from "axios";
import "./RecentGenres.css";

import { topArtists } from "../mockData";

//chart info
const data = [
  {
    name: "sad core",
    size: 100
  },
  {
    name: "anti folk",
    size: 600
  },
  {
    name: "slow core",
    size: 300
  },
  {
    name: "indie rock",
    size: 400
  },
  {
    name: "sad rock",
    size: 300
  }
];
const COLORS = ["#1db954", "#22db63", "#b91d82", "#e141a9", "#e17a41"];

class CustomizedContent extends PureComponent {
  render() {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      payload,
      colors,
      rank,
      name
    } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : "none",
            stroke: "#191414",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10)
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            className="chartText"
            stroke="none"
            fill="#191414"
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 4} y={y + 18} stroke="none" fill="#191414"></text>
        ) : null}
      </g>
    );
  }
}

export default class RecentGenres extends PureComponent {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       topArtists: topArtists,
  //       genres: null
  //     };
  //   }

  //   componentDidMount() {
  //     //this.getTopArtists();
  //   }

  //   getTopArtists = () => {
  //     let access_token = this.props.access_token;
  //     axios
  //       .get("https://api.spotify.com/v1/me/playlists", {
  //         headers: { Authorization: `Bearer ${access_token}` },
  //         params: { limit: 50 }
  //       })
  //       .then(response => {
  //         this.setState({ topArtists: response.data });
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   };

  render() {
    return (
      <div>
        <h2>Recent Genres</h2>
        <ResponsiveContainer width="100%" aspect={3}>
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#000"
            content={<CustomizedContent colors={COLORS} />}
          />
        </ResponsiveContainer>
      </div>
    );
  }
}