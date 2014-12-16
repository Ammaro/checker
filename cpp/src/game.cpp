
#include <Boost/python.hpp>
#include <vector>
#include <cmath>

using namespace std;
using namespace boost::python;

int closest_rank(int player_rank, vector<int> other_ranks)
{
    int index=-1;
    int distance=342342;
    for(int i =0;i<other_ranks.size();i++) {
        if(abs(other_ranks[i]-player_rank) < distance) {
            distance = abs(other_ranks[i]-player_rank);
            index= i;
        }
    }
    return index;
}

BOOST_PYTHON_MODULE( game ) {
    def( "closest_rank", closest_rank);
}


